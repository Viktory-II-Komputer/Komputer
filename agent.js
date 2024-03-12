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
            default:
                console.error("Error: invalid agent.");
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
        if (this.game.rules.winner.isPlayer1 !== null)  // Check for winner.
        {
            this.game.isDone = true;
            console.log('Game won by Player %s.', this.game.rules.winner.logName);
        }
        else if(!this.game.hasNextState)
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
        switch(this.name)
        {
            case "random":
                this.game.board = GetRandomNextBoard(this.game.rules);
                break;
            case "mcts-uct":
                this.logic.init(this.game, this.isPlayer1);
                this.game.board = this.logic.getNextState();
                break;
            default:
                console.error("Error: invalid agent.");
                break;
        }
    }
}  // End class

