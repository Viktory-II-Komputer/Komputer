
export function backpropagate(node, result)
{
    // Update all parent ancestors of node. 
    // End after root is updated, that is, when parent === null.
    while(node !== null)
    {
        node.parent.visitCount++;
        node.parent.sumValue += result;
        node = node.parent;
    }
}

/* 
Because this is an advesarial game...

1. The passed-in result was based on the player: it's 1 for player1 win, -1 for loss, 0 for no winner.

2. The Selection stage will need to alternate searching for best / worst.

This is a twist to MCTS that catches many the first time.  
Will test to confirm how this works.

*/