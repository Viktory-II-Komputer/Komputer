import { Children } from "./children.js";

export class Node
{
    constructor(board, isPlayer1, visitCount = 0, sumValue = 0, parent = null, childrenToClone = null)
    {
        this.board = board;
        this.isPlayer1 = isPlayer1;
        this.visitCount = visitCount;
        this.sumValue = sumValue;
        this.parent = parent;
        this.children = new Children(childrenToClone); 
    }

    clone()
    {
        return (new Node(this.board, this.isPlayer1, this.visitCount, this.sumValue, this.parent, this.children));
    }
}
