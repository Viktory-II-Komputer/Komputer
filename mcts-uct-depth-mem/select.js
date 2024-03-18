import { SETUP } from "../setup.js";

const UCB_C = SETUP.UCB_FORMULA_CONSTANT; 

/// Return descendent child key with max UCB value.
export function SelectNode(root)
{
    let bestUCB = 0;
    let bestChild = null;
    let selectedNode = root.clone();

    // If the selected node has children, find the best descendant.
    while (selectedNode.children.cache.size > 0)
    {
        for (let child of selectedNode.children.cache.keys())
        {
            if (child.visitCount > 0)
            {
                const UCB_SCORE = ( 
                    (child.sumValue / child.visitCount) + ( UCB_C * Math.sqrt( Math.log(child.parent.visitCount) / child.visitCount ) )
                    );
                if (UCB_SCORE > bestUCB)
                {                    
                    bestUCB = UCB_SCORE;
                    bestChild = child; 
                }
            }
        }
        // Continue search under best child, using the LRU children getter, to record using this child.
        selectedNode = bestChild? selectedNode.children.get(bestChild) : selectedNode.children.cache.keys().next().value; // For random play, see note below. 
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

// Random play when no best child may be best for low-branching games. 
// Use: GetRandomKey(selectedNode.children.cache);