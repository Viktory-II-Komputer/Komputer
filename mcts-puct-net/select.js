import { SETUP } from "../setup.js";
import { State } from "./state.js";

const DEPTH_LIMIT = SETUP.PUCT_NET_TREE_DEPTH_LIMIT; 
const UCB_C = SETUP.UCB_FORMULA_CONSTANT; 

export function SelectNode(root, network)
{
    let bestUCB = 0;
    let bestChild = null;
    let selectedNode = root.clone();
    let depth = selectedNode.depth;

    // If the selected node has children, find the best descendant.
    while (depth < DEPTH_LIMIT && selectedNode.children.cache.size > 0)
    {
        for (let child of selectedNode.children.cache.keys())
        {
            if (child.visitCount > 0)
            {
                // Use PUCT formula, adjusted for adversarial play
                const STATE = State(child.board, child.isPlayer1);
                const P = ( 1 - network.run(STATE)[0] );
                const UCB_SCORE = ( 
                    (child.sumValue / child.visitCount) + (P * UCB_C * Math.sqrt( Math.log(child.parent.visitCount) / child.visitCount ) )
                    );
                if (UCB_SCORE > bestUCB)
                {                    
                    bestUCB = UCB_SCORE;
                    bestChild = child; 
                }
            }
        }
        // Continue search under best child, and use the LRU children getter, to record using this child.
        selectedNode = bestChild? selectedNode.children.get(bestChild) : selectedNode.children.cache.keys().next().value; 
        bestUCB = 0;
        bestChild = null;
        depth++;
    }
    return selectedNode;
}

/*

UCB1 formula: avgValue + ( 2 * sqrt( ln N / n ) )

---

avgValue:  node.sumValue / node.visitCount

ln: natural log

N: parent.visitCount 

n: node.visitCount

---

Note: to avoid division by 0 error, visitCount > zero is required.
It also helps the formula work, to get at least some data from each node.

*/ 
