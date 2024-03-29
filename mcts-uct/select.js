import { GetRandomKey } from "../random.js";
import { SETUP } from "../setup.js";

const UCB_C = SETUP.UCB_FORMULA_CONSTANT; 

/// Return descendent child key with max UCB value.
export function SelectNode(root)
{
    let bestUCB = 0;
    let bestChild = null;
    let selectedNode = root.clone();

    // If the selected node has a map of children, find the best descendant.
    while (selectedNode.children.size > 0)
    {
        for (let child of selectedNode.children.keys())
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
        // Continue search under best child.
        selectedNode = bestChild? bestChild: GetRandomKey(selectedNode.children); // Use this, or maybe use selectedNode.children.keys().next().value;
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
