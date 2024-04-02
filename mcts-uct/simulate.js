import { GetRandomNextBoard } from "../random.js";
import { SETUP } from "../setup.js";

const TURN_LIMIT = SETUP.MAX_TURNS_PER_GAME;

export function Simulate(child, rules)
{
    let result = 0;
    const IS_PLAYER1_WINNER = getisPlayer1Winner(child.board, child.isPlayer1, rules);
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
function getisPlayer1Winner(board, isPlayer1, rules)
{
    // Game loop for sim
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
        else if( !HAS_NEXT_STATE || !(turn < TURN_LIMIT) )
        {
            return null;
        }
        // Continue game.
        else
        {
            board = GetRandomNextBoard(rules.nextPossibleBoards);
            isPlayer1 = !isPlayer1;
            turn++;
        }
    }
}
