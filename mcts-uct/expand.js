import { CheckersRules } from "../checkers";
import { TicTacToeRules } from "../tictactoe";
import { Node } from "./node";

export function Expand(node, game)
{
    // If root, add nextPossibleBoards from current game to children.
    // Since each child has the opponent's turn, set to opposite player.
    if (node.parent === null)
    {
        for (const nextBoard of game.rules.nextPossibleBoards)
        {
            node.children.set(new Node(nextBoard, !node.isPlayer1, node))
        }
    }
    // Else, generate nextPossibleBoards from a new instance of the rules.
    // Then for each board, add to children, as an opponent.
    else
    {
        let rules = null;
        switch (game.name)
        {
            case "tictactoe":
                rules = new TicTacToeRules();
                break;
            case "checkers":
                rules = new CheckersRules();
                break;
            default:
                console.error("Error: invalid game passed to MCTS for expansion.")
                break;
        }
        const hasNextState = rules.hasGeneratedNextPossibleStates(parent.board, parent.isPlayer1);
        if (hasNextState)
        {
            for (const nextBoard of rules.nextPossibleBoards)
            {
                node.children.set(new Node(nextBoard, !node.isPlayer1, node))
            }
        }
        // Todo: decide how to handle expansion when terminal.
    }
}
