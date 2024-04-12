
/// Tic Tac Toe

import { Winner } from "../winner.js";

const player1Mark = 'X'
const player2Mark = 'O' 
const EMPTY = '-'
const BOARD_WIDTH = 3;        
const BOARD_HEIGHT = 3;
const BOARD_CELL_COUNT = 9;
const HAS_SPECIAL_PATTERN = false;  // For board logs. False defaults to a grid.

export class TicTacToeRules
{
    constructor()
    {
        this.nextPossibleBoards = []
        this.winner = new Winner();
    }

    getNewBoard(initialBoard)
    {
        const BOARD = (initialBoard === null)? "---------" : initialBoard;
        return [BOARD, BOARD_HEIGHT, BOARD_WIDTH, HAS_SPECIAL_PATTERN];
    }

    hasGeneratedNextPossibleStates(board, isPlayer1)
    {
        // Clear winner from any previous game / simulation.
        this.winner.logName = null;
        this.winner.isPlayer1 = null;

        if (this.isWon(board, isPlayer1))
        {
            // Whoever played last won.
            // So the winner is the opposite.
            this.winner.isPlayer1 = !isPlayer1;
            this.winner.logName = isPlayer1? player2Mark: player1Mark;
            return false;
        }
        else
        {
            if (this.isMovePossible(board))
            {
                this.nextPossibleBoards = [];
                this.pushAllPossibleBoards(board, isPlayer1);
                return true;
            } 
            return false; 
        }
    }

    isMovePossible(board)
    {
        for (const cell of board)
        {
            if (cell === EMPTY)
                return true;
        }
        return false;
    }

    pushAllPossibleBoards(board, isPlayer1)
    {
        let playerMark = isPlayer1? player1Mark : player2Mark;
        for (let index = 0; index < BOARD_CELL_COUNT; index++)
        {
            if (board[index] === EMPTY)
            {
                let newBoard = board.split("");
                newBoard[index] = playerMark;
                newBoard = newBoard.join("");
                this.nextPossibleBoards.push(newBoard);
            }            
        }
    }

    // Check if whoever played last won.
    isWon(board, isPlayer1)
    {
        let opponentMark = isPlayer1? player2Mark : player1Mark;
        return (
            ((board[0] ===   opponentMark) && (board[1] ===   opponentMark) && (board[2] ===   opponentMark)) || // Top row
            ((board[3] ===   opponentMark) && (board[4] ===   opponentMark) && (board[5] ===   opponentMark)) || // Center row
            ((board[6] ===   opponentMark) && (board[7] ===   opponentMark) && (board[8] ===   opponentMark)) || // Bottom row
            ((board[0] ===   opponentMark) && (board[3] ===   opponentMark) && (board[6] ===   opponentMark)) || // Left column
            ((board[1] ===   opponentMark) && (board[4] ===   opponentMark) && (board[7] ===   opponentMark)) || // Center column
            ((board[2] ===   opponentMark) && (board[5] ===   opponentMark) && (board[8] ===   opponentMark)) || // Right column
            ((board[0] ===   opponentMark) && (board[4] ===   opponentMark) && (board[8] ===   opponentMark)) || // Diagonal down
            ((board[2] ===   opponentMark) && (board[4] ===   opponentMark) && (board[6] ===   opponentMark)));  // Diagonal up
    }

    /// Don't expect to use these for TicTacToe, but if a PUCT agent calls, it'll cause no harm. 

    willPlayer1Win(board, isPlayer1)
    {
        return null;
    }

    getPrediction(board, isPlayer1)
    {
        return 0;
    }
}
