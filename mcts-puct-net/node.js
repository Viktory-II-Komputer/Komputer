import { Children } from "./children.js";

export class Node
{
    constructor(board, isPlayer1, visitCount = 0, sumValue = 0, parent = null, childrenToClone = null, isProvenWinner = false)
    {
        this.board = board;
        this.isPlayer1 = isPlayer1;
        this.visitCount = visitCount;
        this.sumValue = sumValue;
        this.parent = parent;
        this.depth = (parent === null) ? 0 : parent.depth + 1;
        this.children = new Children(this.depth + 1, childrenToClone); 
        this.isProvenWinner = isProvenWinner;
    }

    clone()
    {
        return (new Node(this.board, this.isPlayer1, this.visitCount, this.sumValue, this.parent, this.children, this.isProvenWinner));
    }
}
