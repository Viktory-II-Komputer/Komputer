
export function selectNode(root, iterationCount)
{
    // For all visited decendents of the root node, meaning: 
    // In all children maps, for all keys (child nodes) with visitCount > 0: 
    // Calculate the UCB score.
    // Set the value of each child (key) to this score.
    // Return the node key with max UCB value.
    let maxUCBvalue = 0;
    let maxChild = null;
    while (true)  // Fix this.
    {

    }


    return maxChild; // Node with max UCB score
}

/*

UCB1 formula: avgNodeValue + ( 2 * sqrt( ln N / n ) )

---

avgValue:  node.sumValue / node.visitCount

ln: natural log

N: iterationCount 

n: node.visitCount

---

Note: to avoid division by 0 error, visitCount > zero is required.
It also helps the formula work, to get at least some data from each node.

*/ 
