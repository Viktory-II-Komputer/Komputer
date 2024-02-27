
export class Agent
{
    constructor(algorithm)
    {
        this.algorithm = algorithm;
        this.game = null;
        this.isPlayer1 = null;
        console.log("Agent constructed.");
    }

    begin(game, isPlayer1)
    {
        this.game = game;
        this.isPlayer1 = isPlayer1;
        console.log("Begin play on: " + game.name + ".");
    }

    continue()
    {
        console.log("Continue...")
        this.game.hasNextState = this.game.rules.generateNextPossibleBoards(this.game.board, this.isPlayer1);
        if (!this.game.hasNextState)
        {
            this.game.hasWinner = true;
            console.log("Game has a winner.")
        }
        else
        {
            this.game.board = this.getRandomNextBoard(this.game)
        }
    }

    getRandomNextBoard(game)
    {
        console.log("Choose random move.");
        let max = this.game.rules.nextPossibleBoards.length;
        let randomIndex = this.getRandomIndex(max);

        return this.game.rules.nextPossibleBoards[randomIndex];
    }

    // Returns random integer between [zero, max).
    getRandomIndex(max)
    {
        return Math.floor(Math.random() * max);
    }
}
