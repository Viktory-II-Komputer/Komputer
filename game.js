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
                [this.board, this.boardHeight, this.boardWidth] = this.rules.getNewBoard();
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
                let cellIndex = (y * this.boardWidth) + x;
                if (y % 2 == 1)
                {
                    textRow.push(this.board[cellIndex]);
                    textRow.push(" ")
                }
                else if (x % 4 == 0)
                {
                    textRow.push(" ");
                    textRow.push(this.board[cellIndex])
                    textRow.push(" ");
                }
                else
                {
                    textRow.push(this.board[cellIndex])
                    textRow.push(" ");
                }
            }
            console.log(textRow.join(""));
            textRow = [];
        }
    }
}


