
const UCB_C = 2;  // Formula constant that controls ratio of exploit-explore, where zero is greedy.

/// Return descendent child key with max UCB value.
export function SelectNode(parent)
{
    let bestUCB = 0;
    let bestChild = null;

    // If the given parent has a map of children, find the best descendant.
    while (parent.children.size > 0)
    {
        for (let child of parent.children.keys())
        {
            // If visited, set UCB score. If score is best, cache.
            if (child.visitCount > 0)
            {
                const UCB_score = (
                    (child.sumValue / child.visitCount) + ( UCB_C * Math.sqrt( Math.log(parent.visitCount) / child.visitCount ) )
                    );
                parent.children.set(child, UCB_score);
                // For player1, best is min child.
                if (parent.isPlayer1)
                {
                    if (UCB_score < bestUCB)
                    {
                        bestUCB = UCB_score;
                        bestChild = child;
                    }
                }
                // For player2, best is max child.
                else
                {
                    if (UCB_score > bestUCB)
                    {
                        bestUCB = UCB_score;
                        bestChild = child;
                    }
                }
            }
        }
        // Continue search under best child.
        parent = bestChild;
    }
    return bestChild? bestChild : parent;
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
