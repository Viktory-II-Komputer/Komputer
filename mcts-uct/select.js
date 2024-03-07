
const UCB_C = 2;  // Formula constant that controls ratio of exploit-explore, where zero is greedy.

/// Return descendent child key with max UCB value.
export function SelectNode(root)
{
    let bestUCB = 0;
    let bestChild = null;
    let selectedNode = root.clone();

    // If the given parent has a map of children, find the best descendant.
    while (selectedNode.children.size > 0)
    {
        for (let child of selectedNode.children.keys())
        {
            // If visited, set UCB score. If score is best, cache.
            if (child.visitCount > 0)
            {
                const UCB_score = (
                    (child.sumValue / child.visitCount) + ( UCB_C * Math.sqrt( Math.log(selectedNode.visitCount) / child.visitCount ) )
                    );
                selectedNode.children.set(child, UCB_score);
                // For player1, best is max child.
                if (selectedNode.isPlayer1)
                {
                    if (UCB_score > bestUCB)
                    {
                        bestUCB = UCB_score;
                        bestChild = child;
                    }
                }
                // For player2, best is min child.
                else
                {
                    if (UCB_score < bestUCB)
                    {
                        bestUCB = UCB_score;
                        bestChild = child;
                    }
                }
            }
        }
        // Continue search under best child.
        selectedNode = bestChild? bestChild: selectedNode.children.keys().next().value;
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
