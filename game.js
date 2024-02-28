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
                [this.board, this.boardHeight, this.boardWidth,
                 this.hasSpecialPattern] = this.rules.getNewBoard();
                break;
            default:
                console.error("Error: invalid game.")
                break;
        }
        console.log("Game constructed.");
    }
 
    logBoard()
    {
        console.log("= = = = =");
        let textRow = [];
        for (let y = 0; y < this.boardHeight; y++)
        {
            for (let x = 0; x < this.boardWidth; x++)
            {
                if (this.hasSpecialPattern)
                {
                    textRow = this.rules.getSpecialPattern(this.board, textRow, x, y);
                }
                else
                {
                    let cellIndex = (y * this.boardWidth) + x;
                    textRow.push(" ");
                    textRow.push(this.board[cellIndex])
                    textRow.push(" ");
                }
            }
            console.log(textRow.join(""));
            textRow = [];
        }
    }
}
