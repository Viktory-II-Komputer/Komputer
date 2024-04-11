import { MCTS_PUCT_NET_Logic } from "./mcts-puct-net/mcts_putc_net.js";
import { MCTS_PUCT_Logic } from "./mcts-puct/mcts_putc.js";
import { MCTS_UCT_Enhanced_Logic } from "./mcts-uct-enhanced/mcts_utc_enhanced.js";
import { MCTS_UCT_Logic } from "./mcts-uct/mcts_utc.js";
import { GetRandomNextBoard } from "./random.js";
import { NeuralNet } from "./setup.js";

export class Agent
{
    constructor(name, network = null)
    {
        this.logName = name;
        this.name = name.toLowerCase();
        switch (this.name)
        {
            case "random": 
                this.logic = null;
                break;
            case "mcts-uct":
                this.logic = new MCTS_UCT_Logic();
                break;
            case "mcts-uct-enhanced":
                this.logic = new MCTS_UCT_Enhanced_Logic();
                break;
            case "mcts-puct":
                this.logic = new MCTS_PUCT_Logic();
                break;
            case "mcts-puct-net":
                this.logic = new MCTS_PUCT_NET_Logic();
                this.requiresNetwork = true;
                break;
            default:
                console.error("Error: invalid agent name passed to Agent constructor.");
                break;
        }
        this.game = null;
        this.isPlayer1 = null;
        this.winCount = 0;
        console.log(this.logName + " Agent constructed.");
    }

    async begin(game, isPlayer1 = true)
    {
        this.game = game;
        this.isPlayer1 = isPlayer1;
        if (this.requiresNetwork && !this.logic.network)
        {
            this.logic.network = await NeuralNet();
        }
        if (isPlayer1)
        {
            console.log("= = = = =");
            game.logBoard();
            console.log('%s begins.', this.logName);
            console.log("= = = = =");
        }
    }

    continue(turnNumberToLog)
    {
        this.game.hasNextState = this.game.rules.hasGeneratedNextPossibleStates(this.game.board, this.isPlayer1);

        if (this.game.hasWinner()) 
        {
            this.game.isDone = true;
            console.log('Game won by Player %s.', this.game.rules.winner.logName);
        }
        else if(this.game.isOver())  // Game is a tie.
        {
            this.game.isDone = true;
            console.log("Game over.");
        }
        else
        {
            this.chooseNextState();
            this.game.logBoard();
            console.log(`Turn %s: %s`, turnNumberToLog, this.logName); 
            console.log("= = = = =");
        }
    }

    chooseNextState()
    {
        if (this.name === "random")
        {
            this.game.board = GetRandomNextBoard(this.game.rules.nextPossibleBoards);
        }
        else
        {
            // Cache current board.
            this.game.lastBoard = this.game.board;
            console.log(`%s is thinking.`, this.logName);
            // Set next board.
            this.logic.init(this.game, this.isPlayer1);
            this.game.board = this.logic.getNextState();
            // Derive piece movements.
            let movements = [];
            const ORIGIN = this.game.rules.deriveMovements(this.game.lastBoard, this.game.board, this.isPlayer1, movements);
            console.log("Next move origin: " + ORIGIN);
            console.log(`Next movements: [${movements.join()}]`);
        }
    }
}  // End class
