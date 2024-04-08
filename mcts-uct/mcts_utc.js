
import { Node } from "./node.js";
import { SelectNode } from "./select.js";
import { Expand } from "./expand.js";
import { Simulate } from "./simulate.js";
import { Backpropagate } from "./backpropagate.js";
import { SETUP } from "../setup.js";
import { TicTacToeRules } from "../game-rules/tictactoe.js";
import { CheckersRules } from "../game-rules/checkers.js";

const SEARCH_TIME = SETUP.SEARCH_TIME;
const MAX_ITERATIONS = SETUP.MAX_ITERATIONS;

export class MCTS_UCT_Logic
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
        this.rules = this.getSimulationRules(game);

        this.fullyExpand(game.rules.nextPossibleBoards);
        for (let child of this.rootNode.children.keys())
        {
            const RESULT = Simulate(child, this.rules);
            Backpropagate(child, RESULT);
        }
    }

    getNextState()
    {
        while (this.isTimeToThink() && (this.rootNode.visitCount < MAX_ITERATIONS))
        {
            const NODE_TO_VISIT = SelectNode(this.rootNode);
            Expand(NODE_TO_VISIT, this.rules);
            for (let child of NODE_TO_VISIT.children.keys())
            {
                if (child.visitCount === 0)
                {
                    const RESULT = Simulate(child, this.rules);
                    Backpropagate(child, RESULT);
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

    fullyExpand(nextPossibleBoards)
    {
        for (const BOARD of nextPossibleBoards)
        {
            this.rootNode.children.add(new Node(BOARD, !this.rootNode.isPlayer1, 0, 0, this.rootNode, null));
        }
    }
}
