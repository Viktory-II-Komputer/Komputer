
export class Node
{
    constructor(board, isPLayer1, parent = null)
    {
        this.board = board;
        this.isPLayer1 = isPLayer1;
        this.visitCount = 0;
        this.sumValue = 0;
        this.parent = parent;
        this.children = new Map();
    }
}
