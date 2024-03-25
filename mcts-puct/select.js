import { SETUP } from "../setup.js";

const DEPTH_LIMIT = SETUP.TREE_DEPTH_LIMIT; 
const UCB_C = SETUP.UCB_FORMULA_CONSTANT; 

export function SelectNode(root, rules)
{
    let bestUCB = 0;
    let bestChild = null;
    let selectedNode = root.clone();

    // If the selected node has children, find the best descendant.
    while (selectedNode.depth < DEPTH_LIMIT && selectedNode.children.cache.size > 0)
    {
        for (let child of selectedNode.children.cache.keys())
        {
            if (child.visitCount > 0)
            {
                // Use PUCT formula, adjusted for advesarial play
                const P = ( 1 - rules.getPrediction(child.board, child.isPlayer1) ) ;
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
