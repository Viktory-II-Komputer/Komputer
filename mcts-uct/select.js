
export function selectNode(root)
{
    // For all visited decendents of the root node, meaning: 
    // In all children maps, for all keys (child nodes) with visitCount > 0: 
    // Calculate the UCB score.
    // Set the value of each child (key) to this score.
    // Return the node with max UCB score.
    for (let child of root.chilren)
    {

    }


    return ; // Node with max UCB score
}

/*

UCB1 formula: avgValue + ( 2 * sqrt( ln N / n ) )

---

avgValue: nodeValue / visitCount

ln: natural log

N: total iterations 

n: visitCount

---

*/ 
