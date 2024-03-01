
import { Node } from "./node.js";
import { selectNode } from "./select.js";
import { expand } from "./expand.js";
import { simulate } from "./simulate.js";
import { backpropagateResults } from "./backpropagate.js";

const SEARCH_TIME = 5000;  // In milliseconds, so 5000 = 5 seconds.

export class MCTS_UCT_Logic
{
    constructor()
    {
        this.rootNode = null;
        this.endSearchTime = null;
        this.iterationCount = 0;
    }

    init(board, isPlayer1)
    {
        this.endSearchTime = Date.now() + SEARCH_TIME;
        this.rootNode = new Node(board, isPlayer1);

        // For each immediate child of root, simulate once.
        for (let child of this.rootNode.children.keys())
        {
            simulate(child);
            backpropagateResults(child);
            this.iterationCount++;
        }
    }

    getNextState()
    {
        let nodeToVisit = selectNode(this.rootNode);
        expand(nodeToVisit);
        for (let child of nodeToVisit.children.keys())
        {
            if (child.visitCount === 0)
            {
                simulate(child);
                backpropagateResults(child)
                this.iterationCount++;
                break;
            }
        }
        if (this.isTimeToDecide(endSearchTime))
        {
            return this.getBest(this.rootNode);
        }
        else
        {
            this.getNextState();
        }
    }

    isTimeToDecide()
    {
        return (Date.now() > this.endSearchTime);
    }

    getBest()
    {

    }
}
