
export function selectNode(root)
{
    // For all visited decendents of the root node, meaning: 
    // In all children maps, for all keys (child nodes) with visitCount > 0: 
    // Calculate the UCB score.
    // Set the value of each child (key) to this score.
    // Return the node key with max UCB value.
    for (let child of root.chilren)
    {

    }


    return ; // Node with max UCB score
}

/*

UCB1 formula: avgValue + ( 2 * sqrt( ln N / n ) )

---

avgValue: nodeValue / nodeVisitCount

ln: natural log

N: total iterations 

n: nodeVisitCount

---

Note: to avoid division by 0 error, visitCount > zero is required.
It also helps the formula work, to get at least some data from each node.

*/ 
