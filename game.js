import { CheckersRules } from "./game-rules/checkers.js";
import { TicTacToeRules } from "./game-rules/tictactoe.js";

export class Game 
{
    constructor(gameName, initialBoard = null)
    {
        this.logName = gameName;
        this.name = gameName.toLowerCase();
        this.hasNextState = true;
        this.isDone = false;
        this.lastBoard = null;
        switch (this.name)
        {
            case "tictactoe":
                console.log("Constructing Tic Tac Toe.");
                this.rules = new TicTacToeRules();
                [this.board, this.boardHeight, this.boardWidth,
                 this.hasSpecialPattern] = this.rules.getNewBoard(initialBoard);
                break;
            case "checkers":
                console.log("Constructing Checkers.");
                this.rules = new CheckersRules();
                [this.board, this.boardHeight, this.boardWidth,
                 this.hasSpecialPattern] = this.rules.getNewBoard(initialBoard);
                break;
            default:
                console.error("Error: invalid game.")
                break;
        }
    }
 
    /// Console log board from top (index 0) to bottom.
    logBoard()
    {
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
