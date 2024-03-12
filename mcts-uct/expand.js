import { CheckersRules } from "../checkers.js";
import { TicTacToeRules } from "../tictactoe.js";
import { Node } from "./node.js";
import { Backpropagate } from "./backpropagate.js";
import { SETUP } from "../setup.js";

const PLAYER1_WIN = SETUP.REWARD.PLAYER1_WIN;
const PLAYER2_WIN = SETUP.REWARD.PLAYER2_WIN;
const PLAYER1_TIE = SETUP.REWARD.PLAYER1_TIE;
const PLAYER2_TIE = SETUP.REWARD.PLAYER2_TIE;

/// Add new nodes to given node as children, if able, or if terminal, update tree.
export function Expand(node, game)
{
    // If root, add nextPossibleBoards from current game to children.
    if (node.parent === null)
    {
        for (const NEXTBOARD of game.rules.nextPossibleBoards)
        {
            // Since each child is the opponent's turn, set to opposite player.
            node.children.set(new Node(NEXTBOARD, !node.isPlayer1, 0, 0, node, null));
        }
    }
    // Else, generate nextPossibleBoards, if able. For each board, add to children, as an opponent.
    else
    {
        const RULES = getExpansionRules(game);

        const HAS_NEXT_STATE = RULES.hasGeneratedNextPossibleStates(node.board, node.isPlayer1);
        if (HAS_NEXT_STATE)
        {
            for (const NEXT_BOARD of RULES.nextPossibleBoards)
            {
                node.children.set(new Node(NEXT_BOARD, !node.isPlayer1, 0, 0, node, null))
            }
        }
        // When node is a leaf (game in terminal state), check result and update tree.
        else
        {
            handleLeaf(node, RULES);
        }
    }
}

function getExpansionRules(game)
{
    switch (game.name)
    {
        case "tictactoe":
            return new TicTacToeRules();
        case "checkers":
            return new CheckersRules();
        default:
            console.error("Error: invalid game passed to MCTS for expansion.")
            break;
    }
    return null;
}

function handleLeaf(node, RULES)
{
    let result = 0;
    if (RULES.winner.isPlayer1 === null)
    {
        result = node.parent.isPlayer1? PLAYER1_TIE : PLAYER2_TIE;
    }
    else if (RULES.winner.isPlayer1) 
    {
        result = node.parent.isPlayer1? PLAYER1_WIN : PLAYER2_WIN;
    }
    else // Player2 won.
    {
        result = node.parent.isPlayer1? PLAYER2_WIN : PLAYER1_WIN;
    }
    node.sumValue += result;
    node.visitCount++;
    Backpropagate(node, result);
}
