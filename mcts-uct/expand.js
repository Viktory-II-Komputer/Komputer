import { CheckersRules } from "../checkers";
import { TicTacToeRules } from "../tictactoe";
import { Backpropagate } from "./backpropagate";
import { Node } from "./node";

export function Expand(node, game)
{
    // If root, add nextPossibleBoards from current game to children.
    // Since each child is the opponent's turn, set to opposite player.
    if (node.parent === null)
    {
        for (const nextBoard of game.rules.nextPossibleBoards)
        {
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
