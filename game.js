import { Checkers } from "./checkers.js";

export class Game 
{
    constructor(gameName)
    {
        this.name = gameName;
        this.hasWinner = false;
        switch (gameName.toLowerCase())
        {
            case "tictactoe":
                console.log("Constructing Tic Tac Toe.");
                break;
            case "checkers":
                this.setup = new Checkers()
                console.log("Constructing checkers.")
                break;
            default:
                this.type = null;
                console.log("Warning: invalid game.")
                break;
        }
        console.log("Game constructed.");
    }
}


