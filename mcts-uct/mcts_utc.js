
import { Node } from "./node.js";
import { SelectNode } from "./select.js";
import { Expand } from "./expand.js";
import { Simulate } from "./simulate.js";
import { Backpropagate } from "./backpropagate.js";

const SEARCH_TIME = 2000;  // In milliseconds, so 1000 == 1 second.
const MAX_ITERATIONS = 1234567; // 64000;  

export class MCTS_UCT_Logic
{
    constructor()
    {
        this.game = null;
        this.rootNode = null;
        this.endSearchTime = null;
    }

    init(game, isPlayer1)
    {
        this.endSearchTime = (Date.now() + SEARCH_TIME);
        this.rootNode = new Node(game.board, isPlayer1);
        this.game = game;
        Expand(this.rootNode, this.game);
        // For each immediate child of root, simulate once.
        for (let child of this.rootNode.children.keys())
        {
            const result = Simulate(child, this.game);
            Backpropagate(child, result);
        }
    }

    getNextState()
    {
        while (this.isTimeToThink() && (this.rootNode.visitCount < MAX_ITERATIONS))
        {
            let nodeToVisit = SelectNode(this.rootNode);
            Expand(nodeToVisit, this.game);
            for (let child of nodeToVisit.children.keys())
            {
                if (child.visitCount === 0)
                {
                    const result = Simulate(child, this.game);
                    Backpropagate(child, result);
                    break;
                }
            }
        }
        return this.getBest();
    }

    isTimeToThink()
    {
        return (Date.now() < this.endSearchTime);
    }

    getBest()
    {
        let bestChild = null;
        let bestVisitCount = 0;

        for (let child of this.rootNode.children.keys())
        {
            if (child.visitCount > bestVisitCount)
            {
                bestVisitCount = child.visitCount;
                bestChild = child;
            }
        }
        return bestChild.board;
    }
}
