
export class Node
{
    constructor(board, isPlayer1, visitCount = 0, sumValue = 0, parent = null, children = null)
    {
        this.board = board;
        this.isPlayer1 = isPlayer1;
        this.visitCount = visitCount;
        this.sumValue = sumValue;
        this.parent = parent;
        this.children = new Set(children);
    }

    clone()
    {
        return (new Node(this.board, this.isPlayer1, this.visitCount, this.sumValue, this.parent, this.children));
    }
}
