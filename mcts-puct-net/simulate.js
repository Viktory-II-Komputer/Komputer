import { GetRandomNextBoard } from "../random.js";
import { SETUP } from "../setup.js";
import { State } from "./state.js";

const DEPTH_LIMIT = SETUP.PUCT_SIMULATION_DEPTH_LIMIT;
const TURN_LIMIT = SETUP.MAX_TURNS_PER_GAME;

export function Simulate(child, rules, network)
{
    let result = 0;
    const IS_PLAYER1_WINNER = getIsPlayer1Winner(child.board, child.isPlayer1, rules, network);
    if (IS_PLAYER1_WINNER === null)
    {
        result = SETUP.REWARD.TIE;
    }
    else if (IS_PLAYER1_WINNER && child.parent.isPlayer1 || !IS_PLAYER1_WINNER && !child.parent.isPlayer1) 
    {
        result = SETUP.REWARD.WIN; 
    }
    child.sumValue += result; 
    child.visitCount++; 
    return result;
}

///  Returns true for player1 win or false for loss, null if none. 
function getIsPlayer1Winner(board, isPlayer1, rules, network)
{
    // Game loop for sim
    let depth = 0;
    let turn = 0;
    while(true)
    {
        const HAS_NEXT_STATE = rules.hasGeneratedNextPossibleStates(board, isPlayer1);
        
        // Check for a winner.
        if (rules.winner.isPlayer1 !== null)
        {
            return rules.winner.isPlayer1;
        }
        // Check for a tie.
        else if(!HAS_NEXT_STATE)
        {
            return null;
        }
        // Maybe continue.
        else if (depth < DEPTH_LIMIT && turn < TURN_LIMIT)
        {
            board = GetPredictedNextBoard(isPlayer1, rules, network);
            isPlayer1 = !isPlayer1;
            depth++;
        }
        // Guess result.
        else 
        {
            return rules.willPlayer1Win(board, isPlayer1);
        }
    }
}

function GetPredictedNextBoard(currentIsPlayer1, rules, network)
{
    // Choose the board that has the least predicted chance for the opponent to win.
    let bestPrediction = Number.MAX_VALUE;
    let bestBoards = [];
    for (const NEXT_POSSIBLE_BOARD of rules.nextPossibleBoards)
    {
        const STATE = State(NEXT_POSSIBLE_BOARD, !currentIsPlayer1);
        const PREDICTION = network.run(STATE)[0]; 
        if (PREDICTION < bestPrediction)
        {
            bestPrediction = PREDICTION;
            bestBoards = [];
            bestBoards.push(NEXT_POSSIBLE_BOARD);
        }
        else if (PREDICTION === bestPrediction)
        {
            bestBoards.push(NEXT_POSSIBLE_BOARD);
        }
    } 
    return (bestBoards.length > 1) ? GetRandomNextBoard(bestBoards) : bestBoards[0];
}
