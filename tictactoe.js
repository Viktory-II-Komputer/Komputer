
const EMPTY = '-' // Blank cell.
const X = 'X'  // Player1 mark.
const O = 'O' // Player2 mark.
const BOARD_WIDTH = 3;        
const BOARD_HEIGHT = 3;
const BOARD_CELL_COUNT = 9;
const HAS_SPECIAL_PATTERN = false;  // For board logs.

export class TicTacToeRules
{
    constructor()
    {
        this.nextPossibleBoards = []
    }

    getNewBoard()
    {
        return ["---------", BOARD_HEIGHT, BOARD_WIDTH, HAS_SPECIAL_PATTERN] 
    }

    hasGeneratedNextPossibleStates(board, isPlayer1)
    {
        // Clear boards from previous turn.
        this.nextPossibleBoards = [];

        if (this.isMovePossible(board))
        {
            this.pushAllPossibleBoards(board, isPlayer1);
            return true;
        }
        return false;
    }

    isMovePossible(board)
    {
        for (const cell of board)
        {
            if (cell == EMPTY)
                return true;
        }
        return false;
    }

    pushAllPossibleBoards(board, isPlayer1)
    {
        let playerMark = isPlayer1? X : O;
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
}
