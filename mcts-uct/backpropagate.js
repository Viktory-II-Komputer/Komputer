
export function Backpropagate(node, result)
{
    // Update all parent ancestors of node, ending after root is updated.
    while(node.parent !== null)
    {
        result = -result;
        node.parent.sumValue += result;
        node.parent.visitCount++;
        node = node.parent;
    }
}

/* 

Each parent's value is negated, as this is the value from the grandparent's perspective, or in other words,
Negation gives the same reward to each ancestor that matches the simulated node's player, or the opposite reward otherwise.

*/