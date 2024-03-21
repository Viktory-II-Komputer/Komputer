import { Node } from "./node.js";
import { Backpropagate } from "./backpropagate.js";
import { SETUP } from "../setup.js";

export function Expand(node, rules)
{ 
    if (hasNextState(node, rules))
    {
        for (const NEXT_BOARD of rules.nextPossibleBoards)
        {
            node.children.put(new Node(NEXT_BOARD, !node.isPlayer1, 0, 0, node))
        }
    }
    else
    {
        handleLeaf(node, rules);
    }
}

function handleLeaf(node, rules)
{
    let result = 0;
    if (isTie(rules))
    {
        result = SETUP.REWARD.TIE;
    }
    else if (isWin(node, rules))
    {
        result = SETUP.REWARD.WIN;
        node.isProvenWinner = true;
    }
    node.sumValue += result;
    node.visitCount++;
    Backpropagate(node, result);
}

function hasNextState(node, rules)
{
    return (rules.hasGeneratedNextPossibleStates(node.board, node.isPlayer1));
}

function isTie(rules)
{
    return (rules.winner.isPlayer1 === null);
}

function isWin(node, rules)
{
    return (rules.winner.isPlayer1 && node.parent.isPlayer1 || !rules.winner.isPlayer1 && !node.parent.isPlayer1);
}
