import { CheckersRules } from "../checkers.js";
import { TicTacToeRules } from "../tictactoe.js";
import { GetRandomNextBoard } from "../random.js";

// Returned result is 1 for player1 win, -1 for player1 loss, or some small value for a tie.
export function Simulate(child, game)
{
    child.visitCount++; 
    let result = 0;
    const IS_PLAYER1_WINNER = getisPlayer1Winner(child.board, child.isPlayer1, game);
    if (IS_PLAYER1_WINNER === null)
    {
        result = child.parent.isPlayer1? 0.5 : -0.5;
    }
    else if (IS_PLAYER1_WINNER)
    {
        result = child.parent.isPlayer1? 1 : -1;
    }
    else // Player 2 is winner.
    {
        result = child.parent.isPlayer1? -1 : 1;
    }
    child.sumValue += result; 
    return result;
}

// Return true for player1 win or false for loss, null if none. 
function getisPlayer1Winner(board, isPlayer1, game)
{
    const RULES = getSimulationRules(game);

    while(true)
    {
        const HAS_NEXT_STATE = RULES.hasGeneratedNextPossibleStates(board, isPlayer1);
        if (RULES.winner.isPlayer1 !== null)
        {
            return RULES.winner.isPlayer1;
        }
        else if(!HAS_NEXT_STATE)
        {
            return null;
        }
        else
        {
            board = GetRandomNextBoard(RULES);
            isPlayer1 = !isPlayer1;
        }
    }
}

function getSimulationRules(game)
{
    let rules = null;
    switch(game.name)
    {
        case "tictactoe":
            rules = new TicTacToeRules();
            break;
        case "checkers":
            rules = new CheckersRules();
            break;
        default:
            console.error("Error: invalid game passed to MCTS for simulation.")
            break;
    }
    return rules;
}
