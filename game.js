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
                console.log("Constructing checkers.");
                this.setup = new Checkers();
                this.board = this.setup.getNewBoard();
                break;
            default:
                console.log("Warning: invalid game.")
                break;
        }
        console.log("Game constructed.");
    }
}


