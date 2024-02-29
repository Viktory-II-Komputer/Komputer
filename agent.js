
export class Agent
{
    constructor(algorithm)
    {
        this.algorithm = algorithm;
        this.game = null;
        this.isPlayer1 = null;
        console.log(algorithm + " Agent constructed.");
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
        switch(this.algorithm.toLowerCase())
        {
            case "random":
                this.game.board = this.getRandomNextBoard()
                break;
            default:
                console.error("Error: invalid agent.")
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
