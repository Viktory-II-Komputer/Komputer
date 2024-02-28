
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
        console.log("Begin play on: " + game.name + ".");
    }

    continue()
    {
        console.log("Continue...")
        this.game.hasNextState = this.game.rules.hasGeneratedNextPossibleStates(this.game.board, this.isPlayer1);
        if (!this.game.hasNextState)
        {
            this.game.hasWinner = true;
            console.log("Game has a winner.")
        }
        else
        {
            this.chooseNextState();
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
                console.log("Warning: invalid agent.")
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
