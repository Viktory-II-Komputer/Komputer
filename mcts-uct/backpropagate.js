
export function Backpropagate(node, result)
{
    // Update all parent ancestors of node. 
    // End after root is updated, that is, when parent === null.
    while(node.parent !== null)
    {
        node.parent.visitCount++;
        node.parent.sumValue += result;
        node = node.parent;
    }
}

/* 

The passed-in result is 1 for player1 win, -1 for player1 loss, or 0 for no winner.

*/