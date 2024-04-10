
export function Backpropagate(node, result)
{   
    const simulatedNode = node;
    
    // Update all ancestors who match the simulated node by player, ending after root is updated.
    while(node.parent !== null)
    {
        if (node.parent.isPlayer1 === simulatedNode.isPlayer1)
        {
            node.parent.sumValue += result;
        }
        node.parent.visitCount++;
        node = node.parent;
    }
}
