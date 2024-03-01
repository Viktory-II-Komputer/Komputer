
import { selectNode } from "./select.js";
import { expand } from "./expand.js";
import { simulate } from "./simulate.js";
import { backpropagateResults } from "./backpropagate.js";

export class MCTS_UCT_Logic
{
    constructor()
    {
        this.nextStates = new Map();
        this.isTimeToDecide = false;
        this.startTime = null;
    }

    getNextState(currentGameState)
    {
        this.startTime = this.getTime();
        let nodeToVisit = selectNode(currentGameState);
        if (nodeToVisit.visitCount === 0)
        {
            nodeToVisit.visitCount++;
            nodeToVisit.value = simulate(nodeToVisit);
            backpropagateResults(nodeToVisit);
        }
        else
        {
            nodeToVisit.children = expand(nodeToVisit);
            nodeToVisit.children[0].visitCount++;
            nodeToVisit.children[0].value = simulate(children[0]);
            backpropagateResults(nodeToVisit.children[0])
        }        
        if (this.isTimeToDecide())
        {
            return this.getBest(this.nextStates);
        }
        else
        {
            this.getNextState(currentGameState);
        }
    }

    getTime()
    {

    }

    isTimeToDecide()
    {

    }

    getBest()
    {

    }
}
