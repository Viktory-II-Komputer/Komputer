import { MCTS_UCT_Logic } from "./mcts-uct/mcts_utc.js";

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
        console.log(this.logName + " Agent constructed.");
    }

    begin(game, isPlayer1 = true)
    {
        this.game = game;
        this.isPlayer1 = isPlayer1;
        game.logBoard();
        console.log("Begin play on: " + game.name + ".");
    }

    continue(turn)
    {
        this.game.hasNextState = this.game.rules.hasGeneratedNextPossibleStates(this.game.board, this.isPlayer1);
        if (this.game.rules.winner)
        {
            this.game.isDone = true;
            console.log("Game won by Player " + this.game.rules.winner + ".");
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
            console.log("Turn: " + turn);
        }
    }

    chooseNextState()
    {
        switch(this.name)
        {
            case "random":
                this.game.board = this.getRandomNextBoard();
                break;
            case "mcts-uct":
                this.logic.init(this.game.board, this.isPlayer1);
                this.game.board = this.logic.getNextState();
                break;
            default:
                console.error("Error: invalid agent.");
                break;
        }
    }

    getRandomNextBoard()
    {
        let max = this.game.rules.nextPossibleBoards.length;
        let randomIndex = getRandomIndexExclusive(max);
        return this.game.rules.nextPossibleBoards[randomIndex];
    }
}  // End class


// Returns random integer between [zero, max).
function getRandomIndexExclusive(max)
{
    return Math.floor(Math.random() * max);
}
