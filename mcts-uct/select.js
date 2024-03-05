
const UCB_C = 2;  // Explores 

export function selectNode(parent)
{
    // For all visited decendents of the root parent node, meaning: 
    // In all children maps, for all keys (child nodes) with visitCount > 0: 
    // Calculate the UCB score.
    // Set the value of each child (key) to this score.
    // Return the node key with max UCB value.
    let maxUCB = 0;
    let maxChild = null;

    // If the given parent has a map of children, find the best decendent.
    while (parent.children.length > 0)
    {
        // For each immediate child
        for (let child of parent.children.keys())
        {
            // If visited, calculate & set UCB score. If score is best, cache.
            if (child.visitCount > 0)
            {
                const UCB_score = (
                    (child.sumValue / child.visitCount) + ( UCB_C * Math.sqrt( Math.log(parent.visitCount) / child.visitCount ) )
                    );
                parent.children.set(child, UCB_score);
                if (UCB_score > maxUCB)
                {
                    maxUCB = UCB_score;
                    maxChild = child;
                }
            }
        }
        // Continue search under best child.
        parent = maxChild;
    }
    return maxChild;
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
