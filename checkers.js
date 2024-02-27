
/// Board is a grid of 32 cells, 
/// Usually as a string of characters,
/// From index 0 (top) to 31 (bottom), 
/// Where player1 begins on the bottom.

const EMPTY = '+'  // Empty cell.
const MAN = 'M'  // Player1 pawn.
const KING = 'K'  // Player1 royal.
const WOMAN = 'W' // Player2 pawn.
const QUEEN = 'Q'  // Player2 royal.
const CHECKERS_GRID_CELL_COUNT = 32;
const KING_PROMOTION_MAX = 4; // Max index of the top row on a board.
const QUEEN_PROMOTION_MIN = 27; // Min index of the bottom row a board. 

export class CheckersRules 
{
    constructor()
    {
        this.nextPossibleBoards = []
    }

    getNewBoard()
    {
        return "WWWWWWWWWWWW++++++++MMMMMMMMMMMM"
    }

    getNewBoardFromMove (board, originIndex, destinationIndex, opponentIndex = null)
    {
        // Move piece to destination.
        let newBoard = board.split("");
        newBoard[destinationIndex] = board[originIndex];
        newBoard[originIndex] = EMPTY;

        // If an opponent was jumped, remove it.
        if (opponentIndex !== null)
            newBoard[opponentIndex] = EMPTY;

        // Check if a pawn reached the last row and promote if necessary.
        let wasPromoted = false;
        if (newBoard[destinationIndex] === MAN && destinationIndex < KING_PROMOTION_MAX) 
        {
            newBoard[destinationIndex] = KING;
            wasPromoted = true;
        }
        if (newBoard[destinationIndex] === WOMAN && destinationIndex > QUEEN_PROMOTION_MIN) 
        {
            newBoard[destinationIndex] = QUEEN;
            wasPromoted = true;
        }
        return [newBoard.join(""), wasPromoted]
    }

    generateNextPossibleBoards(board, isPlayer1)
     {
        // Clear boards from the previous turn.
        this.nextPossibleBoards = [];

        let playerPawn = isPlayer1 ? MAN : WOMAN;
        let playerRoyal = isPlayer1 ? KING : QUEEN;
        let opponentPawn = isPlayer1 ? WOMAN : MAN;
        let opponentRoyal = isPlayer1 ? QUEEN : KING;
     
        if (this.IsJumpPossibleOnBoard(board, isPlayer1, playerPawn, playerRoyal, opponentPawn, opponentRoyal))
        {
           this.pushAllJumps(board, isPlayer1, playerPawn, playerRoyal, opponentPawn, opponentRoyal);
        }
        else
        {
           this.pushAllAdjacentMoves(board, isPlayer1, playerPawn, playerRoyal);
        }
        return (this.nextPossibleBoards.length > 0);
    }

    IsJumpPossibleOnBoard(board, isPlayer1, playerPawn, playerRoyal, opponentPawn, opponentRoyal)
    {    
       for (let i = 0; i < CHECKERS_GRID_CELL_COUNT; i++)
       {
          // Check if the cell contains a piece of the current player
          if (board[i] === playerPawn || board[i] === playerRoyal)
          {
             // Calculate forward indexes near piece
             let fwdLeftIndex = isPlayer1 ? this.NorthWestGet(i) : this.SouthEastGet(i);
             let fwdRightIndex = isPlayer1 ? this.NorthEastGet(i) : this.SouthWestGet(i);
             let fwdLeftJumpIndex = isPlayer1 ? this.NorthWestJumpGet(i) : this.SouthEastJumpGet(i);
             let fwdRightJumpIndex = isPlayer1 ? this.NorthEastJumpGet(i) : this.SouthWestJumpGet(i);
             // Check for forward left jumps
             if (fwdLeftIndex !== null && fwdLeftJumpIndex !== null &&
                board[fwdLeftJumpIndex] === EMPTY &&
                (board[fwdLeftIndex] === opponentPawn ||
                board[fwdLeftIndex] === opponentRoyal))
             {
                return true;
             }
             // Check for forward right jumps
             if (fwdRightIndex !== null && fwdRightJumpIndex !== null &&
                board[fwdRightJumpIndex] === EMPTY &&
                (board[fwdRightIndex] === opponentPawn ||
                board[fwdRightIndex] === opponentRoyal))
             {
                return true;
             }
             if (board[i] === playerRoyal)
             {
                // Calculate backward cells near the piece
                let backLeftIndex = isPlayer1 ? this.SouthWestGet(i) : this.NorthEastGet(i);
                let backRightIndex = isPlayer1 ? this.SouthEastGet(i) : this.NorthWestGet(i);
                let backLeftJumpIndex = isPlayer1 ? this.SouthWestJumpGet(i) : this.NorthEastJumpGet(i);
                let backRightJumpIndex = isPlayer1 ? this.SouthEastJumpGet(i) : this.NorthWestJumpGet(i);
                // Check for back left jumps
                if (backLeftIndex !== null && backLeftJumpIndex !== null &&
                   board[backLeftJumpIndex] === EMPTY &&
                   (board[backLeftIndex] === opponentPawn ||
                   board[backLeftIndex] === opponentRoyal))
                {
                   return true;
                }
                // Check for back right jumps
                if (backRightIndex !== null && backRightJumpIndex !== null &&
                   board[backRightJumpIndex] === EMPTY &&
                   (board[backRightIndex] === opponentPawn ||
                   board[backRightIndex] === opponentRoyal))
                {
                   return true;
                }
             }
          }
       }
       return false;
    }

    pushAllJumps(board, isPlayer1, playerPawn, playerRoyal, opponentPawn, opponentRoyal) {
        for (let i = 0; index < CHECKERS_GRID_CELL_COUNT; index++) {
            if (board[index] === playerPawn || board[index] === playerRoyal) {
                this.GenerateNextJumpBoards(board, index, isPlayer1, playerPawn, playerRoyal, opponentPawn, opponentRoyal);
            }
        }
    }

    pushAllAdjacentMoves(board, isPlayer1, playerPawn, playerRoyal) {
        for (let i = 0; i < CHECKERS_GRID_CELL_COUNT; i++) {
            if (board[i] === playerPawn || board[i] === playerRoyal) {
                // Calculate forward indexes near piece 
                let fwdLeftIndex = isPlayer1 ? this.NorthWestGet(i) : this.SouthEastGet(i);
                let fwdRightIndex = isPlayer1 ? this.NorthEastGet(i) : this.SouthWestGet(i);

                // Check if piece can move to adjacent cell
                if (fwdLeftIndex !== null && board[fwdLeftIndex] === EMPTY) {
                    // Make the move on a new board.
                    let [newBoard, _] = this.getNewBoardFromMove(board, board[i], fwdLeftIndex);
                    // Add new board to next possible boards
                    this.nextPossibleBoards.push(newBoard);
                }
                if (fwdRightIndex !== null && board[fwdRightIndex] === EMPTY) {
                    let [newBoard, _] = this.getNewBoardFromMove(board, board[i], fwdRightIndex);
                    this.nextPossibleBoards.push(newBoard);
                }
                // Check for king moves
                if (board[i] === playerRoyal) {
                    let backLeftIndex = isPlayer1 ? this.SouthWestGet(i) : this.NorthEastGet(i);
                    let backRightIndex = isPlayer1 ? this.SouthEastGet(i) : this.NorthWestGet(i);
                    if (backLeftIndex !== null && board[backLeftIndex] === EMPTY) {
                        let [newBoard, _] = this.getNewBoardFromMove(board, board[i], backLeftIndex);
                        this.nextPossibleBoards.push(newBoard);
                    }
                    if (backRightIndex !== null && board[backRightIndex] === EMPTY) {
                        let [newBoard, _] = this.getNewBoardFromMove(board, board[i], backRightIndex);
                        this.nextPossibleBoards.push(newBoard);
                    }
                }
            }
        }
    }

    GenerateNextJumpBoards(board, piece, isPlayer1, playerPawn, playerRoyal, opponentPawn, opponentRoyal)
    {
        // Calculate forward indexes near piece
        let fwdLeftIndex = isPlayer1 ? this.NorthWestGet(piece) : this.SouthEastGet(piece);
        let fwdRightIndex = isPlayer1 ? this.NorthEastGet(piece) : this.SouthWestGet(piece);
        let fwdLeftJumpIndex = isPlayer1 ? this.NorthWestJumpGet(piece) : this.SouthEastJumpGet(piece);
        let fwdRightJumpIndex = isPlayer1 ? this.NorthEastJumpGet(piece) : this.SouthWestJumpGet(piece);
        // Check for a forward left jump
        if (fwdLeftIndex !== null && fwdLeftJumpIndex !== null &&
            board[fwdLeftJumpIndex] === EMPTY &&
            (board[fwdLeftIndex] === opponentPawn ||
            board[fwdLeftIndex] === opponentRoyal))
        {
            // Make move on a new board
            let [newBoard, wasPromoted] = this.getNewBoardFromMove(board, piece, fwdLeftJumpIndex, fwdLeftIndex);
            // Continue jumping if possible, or if terminal, add the new board
            if (!wasPromoted && this.IsJumpPossibleForPiece(newBoard, isPlayer1, fwdLeftJumpIndex, playerRoyal, opponentPawn, opponentRoyal))
            {
                this.GenerateNextJumpBoards(newBoard, fwdLeftJumpIndex, isPlayer1, playerPawn, playerRoyal, opponentPawn, opponentRoyal);
            }
            else
            {
                this.nextPossibleBoards.push(newBoard);
            }
        }
        // Check for a forward right jump
        if (fwdRightIndex !== null && fwdRightJumpIndex !== null &&
            board[fwdRightJumpIndex] === EMPTY &&
            (board[fwdRightIndex] === opponentPawn ||
            board[fwdRightIndex] === opponentRoyal))
        {
            // Make move on a new board
            let [newBoard, wasPromoted] = this.getNewBoardFromMove(board, piece, fwdRightJumpIndex, fwdRightIndex);
            // Continue jumping if possible, or if terminal, add the new board
            if (!wasPromoted && this.IsJumpPossibleForPiece(newBoard, isPlayer1, fwdRightJumpIndex, playerRoyal, opponentPawn, opponentRoyal))
            {
                this.GenerateNextJumpBoards(newBoard, fwdRightJumpIndex, isPlayer1, playerPawn, playerRoyal, opponentPawn, opponentRoyal);
            }
            else
            {
                this.nextPossibleBoards.push(newBoard);
            }
        }
        // Check if the piece is a king 
        if (board[piece] === playerRoyal)
        {
            // Calculate backward cells near the piece
            let backLeftIndex = isPlayer1 ? this.SouthWestGet(piece) : this.NorthEastGet(piece);
            let backRightIndex = isPlayer1 ? this.SouthEastGet(piece) : this.NorthWestGet(piece);
            let backLeftJumpIndex = isPlayer1 ? this.SouthWestJumpGet(piece) : this.NorthEastJumpGet(piece);
            let backRightJumpIndex = isPlayer1 ? this.SouthEastJumpGet(piece) : this.NorthWestJumpGet(piece);
            // Check for a back left jump
            if (backLeftIndex !== null && backLeftJumpIndex !== null &&
                board[backLeftJumpIndex] === EMPTY &&
                (board[backLeftIndex] === opponentPawn ||
                board[backLeftIndex] === opponentRoyal))
            {
                // Make move on a new board
                let [newBoard, wasPromoted] = this.getNewBoardFromMove(board, piece, backLeftJumpIndex, backLeftIndex);
                // Continue jumping if possible, or if terminal, add the new board
                if (!wasPromoted && this.IsJumpPossibleForPiece(newBoard, isPlayer1, backLeftJumpIndex, playerRoyal, opponentPawn, opponentRoyal))
                {
                    this.GenerateNextJumpBoards(newBoard, backLeftJumpIndex, isPlayer1, playerPawn, playerRoyal, opponentPawn, opponentRoyal);
                }
                else
                {
                    this.nextPossibleBoards.push(newBoard);
                }
            }
            // Check for a back right jump
            if (backRightIndex !== null && backRightJumpIndex !== null &&
                board[backRightJumpIndex] === EMPTY &&
                (board[backRightIndex] === opponentPawn ||
                board[backRightIndex] === opponentRoyal))
            {
                // Make move on a new board
                let [newBoard, wasPromoted] = this.getNewBoardFromMove(board, piece, backRightJumpIndex, backRightIndex);
                // Continue jumping if possible, or if terminal, add the new board
                if (!wasPromoted && this.IsJumpPossibleForPiece(newBoard, isPlayer1, backRightJumpIndex, playerRoyal, opponentPawn, opponentRoyal))
                {
                    this.GenerateNextJumpBoards(newBoard, backRightJumpIndex, isPlayer1, playerPawn, playerRoyal, opponentPawn, opponentRoyal);
                }
                else
                {
                    this.nextPossibleBoards.push(newBoard);
                }
            }
        }
    }

    IsJumpPossibleForPiece(board, isPlayer1, pieceIndex, playerRoyal, opponentPawn, opponentRoyal)
    {   
        // Calculate forward indexes near piece
        let fwdLeftIndex = isPlayer1 ? this.NorthWestGet(pieceIndex) : this.SouthEastGet(pieceIndex);
        let fwdRightIndex = isPlayer1 ? this.NorthEastGet(pieceIndex) : this.SouthWestGet(pieceIndex);
        let fwdLeftJumpIndex = isPlayer1 ? this.NorthWestJumpGet(pieceIndex) : this.SouthEastJumpGet(pieceIndex);
        let fwdRightJumpIndex = isPlayer1 ? this.NorthEastJumpGet(pieceIndex) : this.SouthWestJumpGet(pieceIndex);
        // Check for forward left jumps
        if (fwdLeftIndex !== null && fwdLeftJumpIndex !== null &&
            board[fwdLeftJumpIndex] === EMPTY &&
            (board[fwdLeftIndex] === opponentPawn ||
            board[fwdLeftIndex] === opponentRoyal))
        {
            return true;
        }
        // Check for forward right jumps
        if (fwdRightIndex !== null && fwdRightJumpIndex !== null &&
            board[fwdRightJumpIndex] === EMPTY &&
            (board[fwdRightIndex] === opponentPawn ||
            board[fwdRightIndex] === opponentRoyal))
        {
            return true;
        }
        if (board[pieceIndex] === playerRoyal)
        {
            // Calculate backward cells near the piece
            let backLeftIndex = isPlayer1 ? this.SouthWestGet(pieceIndex) : this.NorthEastGet(pieceIndex);
            let backRightIndex = isPlayer1 ? this.SouthEastGet(pieceIndex) : this.NorthWestGet(pieceIndex);
            let backLeftJumpIndex = isPlayer1 ? this.SouthWestJumpGet(pieceIndex) : this.NorthEastJumpGet(pieceIndex);
            let backRightJumpIndex = isPlayer1 ? this.SouthEastJumpGet(pieceIndex) : this.NorthWestJumpGet(pieceIndex);
            // Check for back left jumps
            if (backLeftIndex !== null && backLeftJumpIndex !== null &&
                board[backLeftJumpIndex] === EMPTY &&
                (board[backLeftIndex] === opponentPawn ||
                board[backLeftIndex] === opponentRoyal))
            {
                return true;
            }
            // Check for back right jumps
            if (backRightIndex !== null && backRightJumpIndex !== null &&
                board[backRightJumpIndex] === EMPTY &&
                (board[backRightIndex] === opponentPawn ||
                board[backRightIndex] === opponentRoyal))
            {
                return true;
            }
        }
        return false;
    }

    /// ---
    /// Functions to help find what's near any given piece.
    /// Returns some board index nearby a given piece index.
    /// Returns null if off the board.
    /// ---

    NorthWestGet(index) {
        // Index visual of the checker board to confirm below.
        //   +  0   +  1   +   2   +  3
        //   4  +   5  +   6   +   7  +
        //   +  8   +  9   +  10   + 11
        //  12  +  13  +  14   +  15  +
        //   + 16   + 17   +  18   + 19
        //  20  +  21  +  22   +  23  +
        //   + 24   + 25   +  26   + 27
        //  28  +  29  +  30   +  31  +
        // Check for topmost cells that have no northWest.
        if (index < 5)
            return null;
        // Check rows that offset toward East, which all have a northWest.
        if ((index % 8) < 4)
        {
            return index - 4;
        }
        // Row is not offset, so after each remaining row beginning, calculate the northWest.
        else
        {
            // Check if row beginning.
            if (index % 4 == 0)
                return null;
            else
                return index - 5;
        }
    }
        
    NorthEastGet(index) {
        // Index visual of the checker board to confirm below.
        //   +  0   +  1   +   2   +  3
        //   4  +   5  +   6   +   7  +
        //   +  8   +  9   +  10   + 11
        //  12  +  13  +  14   +  15  +
        //   + 16   + 17   +  18   + 19
        //  20  +  21  +  22   +  23  +
        //   + 24   + 25   +  26   + 27
        //  28  +  29  +  30   +  31  +
        // Check the top row, which has no northEast.
        if (index < 4)
            return null;
        // Check rows that offset toward East, which all, except for end cells, have a northEast.
        if ((index % 8) < 4)
        {
            if (index % 4 == 3)
                return null;
            else
                return index - 3;
        }
        // Row is not offset, so for all cells calculate the northEast.
        else
        {
            return index - 4;
        }
    }
        
    SouthWestGet(index) {
        // Index visual of the checker board to confirm below.
        //   +  0   +  1   +   2   +  3
        //   4  +   5  +   6   +   7  +
        //   +  8   +  9   +  10   + 11
        //  12  +  13  +  14   +  15  +
        //   + 16   + 17   +  18   + 19
        //  20  +  21  +  22   +  23  +
        //   + 24   + 25   +  26   + 27
        //  28  +  29  +  30   +  31  +
        // Check for lowest row cells that have no southWest.
        if (index > 27)
            return null;
        // Check rows that offset toward East, which all have a southWest.
        if ((index % 8) < 4)
        {
            return index + 4;
        }
        // Row is not offset, so after each remaining row beginning, calculate the southWest.
        else
        {
            // Check if row beginning.
            if (index % 4 == 0)
                return null;
            else
                return index + 3;
        }
    }
        
    SouthEastGet(index) {
        // Index visual of the checker board to confirm below.
        //   +  0   +  1   +   2   +  3
        //   4  +   5  +   6   +   7  +
        //   +  8   +  9   +  10   + 11
        //  12  +  13  +  14   +  15  +
        //   + 16   + 17   +  18   + 19
        //  20  +  21  +  22   +  23  +
        //   + 24   + 25   +  26   + 27
        //  28  +  29  +  30   +  31  +
        // Check near bottom row cells, which have no southEast.
        if (index > 26)
            return null;
        // Check rows that offset toward East, which all, except for end cells, have a southEast.
        if ((index % 8) < 4)
        {
            if (index % 4 == 3)
                return null;
            else
                return index + 5;
        }
        // Row is not offset, so for all cells calculate the southEast.
        else
        {
            return index + 4;
        }
    }
        
    NorthWestJumpGet(index) {
        // Index visual of the checker board to confirm below.
        //   +  0   +  1   +   2   +  3
        //   4  +   5  +   6   +   7  +
        //   +  8   +  9   +  10   + 11
        //  12  +  13  +  14   +  15  +
        //   + 16   + 17   +  18   + 19
        //  20  +  21  +  22   +  23  +
        //   + 24   + 25   +  26   + 27
        //  28  +  29  +  30   +  31  +
        // Check for topmost cells or row beginnings, all which have no northWest jump.
        if (index < 9 || index % 4 == 0)
            return null;
        else
            return index - 9;
    }
        
    NorthEastJumpGet(index) {
        // Index visual of the checker board to confirm below.
        //   +  0   +  1   +   2   +  3
        //   4  +   5  +   6   +   7  +
        //   +  8   +  9   +  10   + 11
        //  12  +  13  +  14   +  15  +
        //   + 16   + 17   +  18   + 19
        //  20  +  21  +  22   +  23  +
        //   + 24   + 25   +  26   + 27
        //  28  +  29  +  30   +  31  +
        // Check for topmost cells or row ends, all which have no northEast jump.
        if (index < 8 || index % 4 == 3)
            return null;
        else
            return index - 7;
    }
        
    SouthWestJumpGet(index) {
        // Index visual of the checker board to confirm below.
        //   +  0   +  1   +   2   +  3
        //   4  +   5  +   6   +   7  +
        //   +  8   +  9   +  10   + 11
        //  12  +  13  +  14   +  15  +
        //   + 16   + 17   +  18   + 19
        //  20  +  21  +  22   +  23  +
        //   + 24   + 25   +  26   + 27
        //  28  +  29  +  30   +  31  +
        // Check for bottom cells or row beginnings, which all have no southWest jump.
        if (index > 23 || index % 4 == 0)
            return null;
        else
            return index + 7;
    }
        
    SouthEastJumpGet(index) {
        // Index visual of the checker board to confirm below.
        //   +  0   +  1   +   2   +  3
        //   4  +   5  +   6   +   7  +
        //   +  8   +  9   +  10   + 11
        //  12  +  13  +  14   +  15  +
        //   + 16   + 17   +  18   + 19
        //  20  +  21  +  22   +  23  +
        //   + 24   + 25   +  26   + 27
        //  28  +  29  +  30   +  31  +
        // Check for bottom cells or row ends, which all have no southEast jump.
        if (index > 23 || index % 4 == 3)
            return null;
        else
            return index + 9;
    }

} // End class 
