import { MCTS_PUCT_Logic } from "./mcts-puct/mcts_putc.js";
import { MCTS_UCT_Enhanced_Logic } from "./mcts-uct-enhanced/mcts_utc_enhanced.js";
import { MCTS_UCT_Logic } from "./mcts-uct/mcts_utc.js";
import { GetRandomNextBoard } from "./random.js";

export class Agent
{
    constructor(name)
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
            default:
                console.error("Error: invalid agent name passed to Agent constructor.");
                break;
        }
        this.game = null;
        this.isPlayer1 = null;
        this.winCount = 0;
        console.log(this.logName + " Agent constructed.");
    }

    begin(game, isPlayer1 = true)
    {
        this.game = game;
        this.isPlayer1 = isPlayer1;
        if (isPlayer1)
        {
            game.logBoard();
            console.log('%s begins.', this.logName);
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
            console.log(`%s is thinking.`, this.logName);
            this.logic.init(this.game, this.isPlayer1);
            this.game.board = this.logic.getNextState();
        }
    }
}  // End class
