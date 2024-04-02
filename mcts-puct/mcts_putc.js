import { Node } from "./node.js";
import { SelectNode } from "./select.js";
import { Expand } from "./expand.js";
import { Simulate } from "./simulate.js";
import { Backpropagate } from "./backpropagate.js";
import { SETUP } from "../setup.js";
import { TicTacToeRules } from "../tictactoe.js";
import { CheckersRules } from "../checkers.js";

const SEARCH_TIME = SETUP.SEARCH_TIME;
const MAX_ITERATIONS = SETUP.MAX_ITERATIONS;
const DEPTH_LIMIT = SETUP.PUCT_TREE_DEPTH_LIMIT;

export class MCTS_PUCT_Logic
{
    constructor()
    {
        this.endSearchTime = null;
        this.rootNode = null;
        this.rules = null; 
    }

    init(game, isPlayer1)
    {
        this.endSearchTime = (Date.now() + SEARCH_TIME);
        this.rootNode = new Node(game.board, isPlayer1);
        if (this.rules === null)
        {
            this.rules = this.getSimulationRules(game);
        }
        this.expandRoot(game.rules.nextPossibleBoards);
        for (const CHILD of this.rootNode.children.cache.keys())
        {
            const RESULT = Simulate(CHILD, this.rules);
            Backpropagate(CHILD, RESULT);
        }
    }

    getNextState()
    {
        while (this.hasTimeToThink() && this.hasMoreIterations())
        {
            const NODE_TO_VISIT = SelectNode(this.rootNode, this.rules);
            if (NODE_TO_VISIT.depth < DEPTH_LIMIT)
            {
                Expand(NODE_TO_VISIT, this.rules);
                // Get first child via LRU children getter, which moves child to end, cycling who gets simulated next visit.
                for (let child of NODE_TO_VISIT.children.cache.keys())
                {
                    const CHILD_TO_SIM = NODE_TO_VISIT.children.get(child);  
                    const RESULT = Simulate(CHILD_TO_SIM, this.rules);
                    Backpropagate(CHILD_TO_SIM, RESULT);
                    break;
                }
            }
            else
            {
                // At tree depth limit, just simulate the node.
                const RESULT = Simulate(NODE_TO_VISIT, this.rules);
                Backpropagate(NODE_TO_VISIT, RESULT);
            }
        }
        return this.getBest();
    }

    hasTimeToThink()
    {
        return (Date.now() < this.endSearchTime);
    }

    hasMoreIterations()
    {
        return (this.rootNode.visitCount < MAX_ITERATIONS);
    }

    getBest()
    {
        let bestChild = null;
        let bestVisitCount = 0;

        for (const CHILD of this.rootNode.children.cache.keys())
        {
            if (CHILD.isProvenWinner === true)
            {
                bestChild = CHILD;
                break;
            }
            if (CHILD.visitCount > bestVisitCount)
            {
                bestVisitCount = CHILD.visitCount;
                bestChild = CHILD;
            }
        }
        return bestChild.board;
    }

    getSimulationRules(game)
    {
        let rules = null;
        switch(game.name)
        {
            case "tictactoe":
                rules = new TicTacToeRules();
                break;
            case "checkers":
                rules = new CheckersRules();
                break;
            default:
                console.error("Error: invalid game passed to MCTS for simulation.")
                break;
        }
        return rules;
    }

    expandRoot(nextPossibleBoards)
    {
        for (const BOARD of nextPossibleBoards)
        {
            this.rootNode.children.put(new Node(BOARD, !this.rootNode.isPlayer1, 0, 0, this.rootNode));
        }
    }
}
