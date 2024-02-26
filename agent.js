
export class Agent
{
    constructor(algorithm)
    {
        this.algorithm = algorithm;
        this.game = null;
        console.log("Agent constructed.");
    }

    begin(game)
    {
        this.game = game;
        console.log("Begin play on: " + game.name + ".");
    }

    continue()
    {
        console.log("Continue play.")
        if (Math.random() < 0.1)
        {
            this.game.hasWinner = true;
            console.log("Game has a winner.")
        }
    }
}
