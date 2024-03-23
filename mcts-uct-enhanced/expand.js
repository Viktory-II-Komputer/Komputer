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
        result = calculateProvenWinReward(node.depth);
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

function calculateProvenWinReward(depth) {
    switch(depth)
    {
        // An exponential decay function for rewards by depth, from Depth 1: million to Depth > 9.
        // These large rewards may help to differentiate between a winning game vs a won game.
        // Otherwise, a winning depth-limited agent may be happy to push pieces in a circle.
        // Basically, a proven win should be worth more than a win estimate via simulation.
        // Likewise, a near win should be worth more than a distant win.

        // case 1:  Depth 1 doesn't need a reward, since proven winners are always chosen.
        //     return 1E6;
        case 2:
            return 400000;
        case 3:
            return 150000;
        case 4:
            return 60000;
        case 5:
            return 20000;
        case 6:
            return 6000;
        case 7:
            return 1500;
        case 8:
            return 400;
        case 9:
            return 120;
        default: 
            return 30;
    }
}
