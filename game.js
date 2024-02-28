import { CheckersRules } from "./checkers.js";

export class Game 
{
    constructor(gameName)
    {
        this.name = gameName;
        this.hasWinner = false;
        this.hasNextState = true;
        switch (gameName.toLowerCase())
        {
            case "tictactoe":
                console.log("Constructing Tic Tac Toe.");
                break;
            case "checkers":
                console.log("Constructing Checkers.");
                this.rules = new CheckersRules();
                this.board = this.rules.getNewBoard();
                break;
            default:
                console.log("Warning: invalid game.")
                break;
        }
        console.log("Game constructed.");
    }
}


