
/// Board is a grid of 32 cells, 
/// Usually as a string of characters,
/// From index 0 (top) to 31 (bottom), 
/// Where player1 begins on the bottom.
///
///  Board vizualization:
///
///      0      1       2      3
///   4      5      6       7   
///      8      9      10     11
///  12     13     14      15  
///     16     17      18     19
///  20     21     22      23   
///     24     25      26     27
///  28     29     30      31   

import { Winner } from "./winner"

const EMPTY = '+'  // Empty cell.
const MAN = 'M'  // Player1 pawn.
const KING = 'K'  // Player1 royal.
const WOMAN = 'W' // Player2 pawn.
const QUEEN = 'Q'  // Player2 royal.
const BOARD_WIDTH = 4;        
const BOARD_HEIGHT = 8;
const BOARD_CELL_COUNT = 32;
const HAS_CHECKERS_PATTERN = true;  // For board logs.
const KING_PROMOTION_MAX = 4; // Max index, exclusive, of the top row.
const QUEEN_PROMOTION_MIN = 27; // Min index, exclusive, of the bottom row. 

export class CheckersRules 
{
    constructor()
    {
        this.nextPossibleBoards = []
        this.winner = new Winner();
    }

    getNewBoard()
    {
        return ["WWWWWWWWWWWW++++++++MMMMMMMMMMMM", BOARD_HEIGHT, BOARD_WIDTH, HAS_CHECKERS_PATTERN] 
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

    hasGeneratedNextPossibleStates(board, isPlayer1)
     {
        // Clear boards from the previous turn.
        this.nextPossibleBoards = [];

        let playerPawn = isPlayer1 ? MAN : WOMAN;
        let playerRoyal = isPlayer1 ? KING : QUEEN;
        let opponentPawn = isPlayer1 ? WOMAN : MAN;
        let opponentRoyal = isPlayer1 ? QUEEN : KING;
     
        if (this.isJumpPossibleOnBoard(board, isPlayer1, playerPawn, playerRoyal, opponentPawn, opponentRoyal))
        {
           this.pushAllJumps(board, isPlayer1, playerPawn, playerRoyal, opponentPawn, opponentRoyal);
        }
        else
        {
           this.pushAllAdjacentMoves(board, isPlayer1, playerPawn, playerRoyal);
        }
        if (this.nextPossibleBoards.length > 0)
        {
            return true;
        }
        else
        {
            // Whoever played last won.
            // So the winner is the opposite.
            this.winner.isPlayer1 = !isPlayer1;
            this.winner.logName = isPlayer1? "2" : "1";
            return false;
        }
    }

    isJumpPossibleOnBoard(board, isPlayer1, playerPawn, playerRoyal, opponentPawn, opponentRoyal)
    {    
       for (let i = 0; i < BOARD_CELL_COUNT; i++)
       {
          // Check if the cell contains a piece of the current player
          if (board[i] === playerPawn || board[i] === playerRoyal)
          {
             // Calculate forward indexes near piece
             let fwdLeftIndex = isPlayer1 ? this.northWestGet(i) : this.southEastGet(i);
             let fwdRightIndex = isPlayer1 ? this.northEastGet(i) : this.southWestGet(i);
             let fwdLeftJumpIndex = isPlayer1 ? this.northWestJumpGet(i) : this.southEastJumpGet(i);
             let fwdRightJumpIndex = isPlayer1 ? this.northEastJumpGet(i) : this.southWestJumpGet(i);
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
                let backLeftIndex = isPlayer1 ? this.southWestGet(i) : this.northEastGet(i);
                let backRightIndex = isPlayer1 ? this.southEastGet(i) : this.northWestGet(i);
                let backLeftJumpIndex = isPlayer1 ? this.southWestJumpGet(i) : this.northEastJumpGet(i);
                let backRightJumpIndex = isPlayer1 ? this.southEastJumpGet(i) : this.northWestJumpGet(i);
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
        for (let index = 0; index < BOARD_CELL_COUNT; index++) {
            if (board[index] === playerPawn || board[index] === playerRoyal) {
                this.generateNextJumpBoards(board, index, isPlayer1, playerPawn, playerRoyal, opponentPawn, opponentRoyal);
            }
        }
    }

    pushAllAdjacentMoves(board, isPlayer1, playerPawn, playerRoyal) {
        for (let i = 0; i < BOARD_CELL_COUNT; i++) {
            if (board[i] === playerPawn || board[i] === playerRoyal) {
                // Calculate forward indexes near piece 
                let fwdLeftIndex = isPlayer1 ? this.northWestGet(i) : this.southEastGet(i);
                let fwdRightIndex = isPlayer1 ? this.northEastGet(i) : this.southWestGet(i);

                // Check if piece can move to adjacent cell
                if (fwdLeftIndex !== null && board[fwdLeftIndex] === EMPTY) {
                    // Make the move on a new board.
                    let [newBoard, _] = this.getNewBoardFromMove(board, i, fwdLeftIndex);
                    // Add new board to next possible boards
                    this.nextPossibleBoards.push(newBoard);
                }
                if (fwdRightIndex !== null && board[fwdRightIndex] === EMPTY) {
                    let [newBoard, _] = this.getNewBoardFromMove(board, i, fwdRightIndex);
                    this.nextPossibleBoards.push(newBoard);
                }
                // Check for king moves
                if (board[i] === playerRoyal) {
                    let backLeftIndex = isPlayer1 ? this.southWestGet(i) : this.northEastGet(i);
                    let backRightIndex = isPlayer1 ? this.southEastGet(i) : this.northWestGet(i);
                    if (backLeftIndex !== null && board[backLeftIndex] === EMPTY) {
                        let [newBoard, _] = this.getNewBoardFromMove(board, i, backLeftIndex);
                        this.nextPossibleBoards.push(newBoard);
                    }
                    if (backRightIndex !== null && board[backRightIndex] === EMPTY) {
                        let [newBoard, _] = this.getNewBoardFromMove(board, i, backRightIndex);
                        this.nextPossibleBoards.push(newBoard);
                    }
                }
            }
        }
    }

    generateNextJumpBoards(board, piece, isPlayer1, playerPawn, playerRoyal, opponentPawn, opponentRoyal)
    {
        // Calculate forward indexes near piece
        let fwdLeftIndex = isPlayer1 ? this.northWestGet(piece) : this.southEastGet(piece);
        let fwdRightIndex = isPlayer1 ? this.northEastGet(piece) : this.southWestGet(piece);
        let fwdLeftJumpIndex = isPlayer1 ? this.northWestJumpGet(piece) : this.southEastJumpGet(piece);
        let fwdRightJumpIndex = isPlayer1 ? this.northEastJumpGet(piece) : this.southWestJumpGet(piece);
        // Check for a forward left jump
        if (fwdLeftIndex !== null && fwdLeftJumpIndex !== null &&
            board[fwdLeftJumpIndex] === EMPTY &&
            (board[fwdLeftIndex] === opponentPawn ||
            board[fwdLeftIndex] === opponentRoyal))
        {
            // Make move on a new board
            let [newBoard, wasPromoted] = this.getNewBoardFromMove(board, piece, fwdLeftJumpIndex, fwdLeftIndex);
            // Continue jumping if possible, or if terminal, add the new board
            if (!wasPromoted && this.isJumpPossibleForPiece(newBoard, isPlayer1, fwdLeftJumpIndex, playerRoyal, opponentPawn, opponentRoyal))
            {
                this.generateNextJumpBoards(newBoard, fwdLeftJumpIndex, isPlayer1, playerPawn, playerRoyal, opponentPawn, opponentRoyal);
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
            if (!wasPromoted && this.isJumpPossibleForPiece(newBoard, isPlayer1, fwdRightJumpIndex, playerRoyal, opponentPawn, opponentRoyal))
            {
                this.generateNextJumpBoards(newBoard, fwdRightJumpIndex, isPlayer1, playerPawn, playerRoyal, opponentPawn, opponentRoyal);
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
            let backLeftIndex = isPlayer1 ? this.southWestGet(piece) : this.northEastGet(piece);
            let backRightIndex = isPlayer1 ? this.southEastGet(piece) : this.northWestGet(piece);
            let backLeftJumpIndex = isPlayer1 ? this.southWestJumpGet(piece) : this.northEastJumpGet(piece);
            let backRightJumpIndex = isPlayer1 ? this.southEastJumpGet(piece) : this.northWestJumpGet(piece);
            // Check for a back left jump
            if (backLeftIndex !== null && backLeftJumpIndex !== null &&
                board[backLeftJumpIndex] === EMPTY &&
                (board[backLeftIndex] === opponentPawn ||
                board[backLeftIndex] === opponentRoyal))
            {
                // Make move on a new board
                let [newBoard, wasPromoted] = this.getNewBoardFromMove(board, piece, backLeftJumpIndex, backLeftIndex);
                // Continue jumping if possible, or if terminal, add the new board
                if (!wasPromoted && this.isJumpPossibleForPiece(newBoard, isPlayer1, backLeftJumpIndex, playerRoyal, opponentPawn, opponentRoyal))
                {
                    this.generateNextJumpBoards(newBoard, backLeftJumpIndex, isPlayer1, playerPawn, playerRoyal, opponentPawn, opponentRoyal);
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
                if (!wasPromoted && this.isJumpPossibleForPiece(newBoard, isPlayer1, backRightJumpIndex, playerRoyal, opponentPawn, opponentRoyal))
                {
                    this.generateNextJumpBoards(newBoard, backRightJumpIndex, isPlayer1, playerPawn, playerRoyal, opponentPawn, opponentRoyal);
                }
                else
                {
                    this.nextPossibleBoards.push(newBoard);
                }
            }
        }
    }

    isJumpPossibleForPiece(board, isPlayer1, pieceIndex, playerRoyal, opponentPawn, opponentRoyal)
    {   
        // Calculate forward indexes near piece
        let fwdLeftIndex = isPlayer1 ? this.northWestGet(pieceIndex) : this.southEastGet(pieceIndex);
        let fwdRightIndex = isPlayer1 ? this.northEastGet(pieceIndex) : this.southWestGet(pieceIndex);
        let fwdLeftJumpIndex = isPlayer1 ? this.northWestJumpGet(pieceIndex) : this.southEastJumpGet(pieceIndex);
        let fwdRightJumpIndex = isPlayer1 ? this.northEastJumpGet(pieceIndex) : this.southWestJumpGet(pieceIndex);
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
            let backLeftIndex = isPlayer1 ? this.southWestGet(pieceIndex) : this.northEastGet(pieceIndex);
            let backRightIndex = isPlayer1 ? this.southEastGet(pieceIndex) : this.northWestGet(pieceIndex);
            let backLeftJumpIndex = isPlayer1 ? this.southWestJumpGet(pieceIndex) : this.northEastJumpGet(pieceIndex);
            let backRightJumpIndex = isPlayer1 ? this.southEastJumpGet(pieceIndex) : this.northWestJumpGet(pieceIndex);
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

    northWestGet(index) {
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
        
    northEastGet(index) {
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
        
    southWestGet(index) {
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
        
    southEastGet(index) {
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
        
    northWestJumpGet(index) {
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
        
    northEastJumpGet(index) {
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
        
    southWestJumpGet(index) {
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
        
    southEastJumpGet(index) {
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

    ///  Helper to console log boards in a checkers pattern.
    getSpecialPattern(board, textRow, x, y)
    {
        let cellIndex = (y * BOARD_WIDTH) + x;
        if (y % 2 == 1)
        {
            textRow.push(board[cellIndex]);
            textRow.push(" ")
        }
        else if (x % BOARD_WIDTH == 0)
        {
            textRow.push(" ");
            textRow.push(board[cellIndex])
            textRow.push(" ");
        }
        else
        {
            textRow.push(board[cellIndex])
            textRow.push(" ");
        }
        return textRow;
    }

} // End class 
