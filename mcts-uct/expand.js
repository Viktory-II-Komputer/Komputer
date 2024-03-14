import { Node } from "./node.js";
import { Backpropagate } from "./backpropagate.js";
import { SETUP } from "../setup.js";

/// Add new nodes to given node as children, if able, or if terminal, update tree.
export function Expand(node, rules)
{
    // Generate nextPossibleBoards / states. For each board, add to children, as an opponent.
    const HAS_NEXT_STATE = rules.hasGeneratedNextPossibleStates(node.board, node.isPlayer1);
    if (HAS_NEXT_STATE)
    {
        for (const NEXT_BOARD of rules.nextPossibleBoards)
        {
            node.children.set(new Node(NEXT_BOARD, !node.isPlayer1, 0, 0, node, null))
        }
    }
    // When node is a leaf (game in terminal state), check result and update tree.
    else
    {
        handleLeaf(node, rules);
    }
}

function handleLeaf(node, rules)
{
    let result = 0;
    if (rules.winner.isPlayer1 === null)
    {
        result = SETUP.REWARD.TIE;
    }
    else if (rules.winner.isPlayer1 && node.parent.isPlayer1 || !rules.winner.isPlayer1 && !node.parent.isPlayer1) 
    {
        result = SETUP.REWARD.WIN;
    }
    node.sumValue += result;
    node.visitCount++;
    Backpropagate(node, result);
}
