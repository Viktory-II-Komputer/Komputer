import { CheckersRules } from "./checkers.js";
import { TicTacToeRules } from "./tictactoe.js";

export class Game 
{
    constructor(gameName)
    {
        this.logName = gameName;
        this.name = gameName.toLowerCase();
        this.hasNextState = true;
        this.isDone = false;
        switch (this.name)
        {
            case "tictactoe":
                console.log("Constructing Tic Tac Toe.");
                this.rules = new TicTacToeRules();
                [this.board, this.boardHeight, this.boardWidth,
                 this.hasSpecialPattern] = this.rules.getNewBoard();
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
    }
 
    /// Console log board from top (index 0) to bottom.
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

    hasWinner()
    {
        return this.rules.winner.isPlayer1 !== null;
    }

    isOver()
    {
        return !this.hasNextState;
    }
}
