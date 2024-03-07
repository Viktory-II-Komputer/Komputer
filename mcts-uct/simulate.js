import { CheckersRules } from "../checkers.js";
import { TicTacToeRules } from "../tictactoe.js";
import { GetRandomNextBoard } from "../random.js";

export function Simulate(child, game)
{
    child.visitCount++; 
    let result = 0;
    const IS_PLAYER1_WINNER = getisPlayer1Winner(child.board, child.isPlayer1, game);
    if (IS_PLAYER1_WINNER === null)
    {
        result = child.isPlayer1? 0.125 : -0.125;
    }
    else if (IS_PLAYER1_WINNER)
    {
        result = child.isPlayer1? 1 : -1;
    }
    else // Player 2 is winner.
    {
        result = child.isPlayer1? -1 : 1;
    }
    child.sumValue += result; 
    return result;
}

// Return true for player1 win or false for loss, null if none. 
function getisPlayer1Winner(board, isPlayer1, game)
{
    let rules = getSimulationRules(game);

    while(true)
    {
        const hasNextState = rules.hasGeneratedNextPossibleStates(board, isPlayer1);
        if (rules.winner.isPlayer1 !== null)
        {
            return rules.winner.isPlayer1;
        }
        else if(!hasNextState)
        {
            return null;
        }
        else
        {
            board = GetRandomNextBoard(rules);
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

