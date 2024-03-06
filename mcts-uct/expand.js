import { CheckersRules } from "../checkers.js";
import { TicTacToeRules } from "../tictactoe.js";
import { Backpropagate } from "./backpropagate.js";
import { Node } from "./node.js";

/// Add new nodes to given node as children, if able, or if terminal, update tree.
export function Expand(node, game)
{
    // If root, add nextPossibleBoards from current game to children.
    if (node.parent === null)
    {
        for (const nextBoard of game.rules.nextPossibleBoards)
        {
            // Since each child is the opponent's turn, set to opposite player.
            node.children.set(new Node(nextBoard, !node.isPlayer1, node))
        }
    }
    // Else, generate nextPossibleBoards, if able. For each board, add to children, as an opponent.
    else
    {
        let rules = getExpansionRules(game);

        const hasNextState = rules.hasGeneratedNextPossibleStates(parent.board, parent.isPlayer1);
        if (hasNextState)
        {
            for (const nextBoard of rules.nextPossibleBoards)
            {
                node.children.set(new Node(nextBoard, !node.isPlayer1, node))
            }
        }
        // If leaf node (game in terminal state), get result and update tree.
        else
        {
            const result = Simulate(parent, game);
            Backpropagate(parent, result);
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
