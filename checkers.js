export class CheckersRules 
{
    constructor()
    {
        this.boardRecycler = [];
    }

    getNewBoard ()
    {
        if (this.boardRecycler.length === 0)
        {
            return [
                'W', 'W', 'W', 'W',
                'W', 'W', 'W', 'W',
                'W', 'W', 'W', 'W',
                '+', '+', '+', '+',
                '+', '+', '+', '+',
                'M', 'M', 'M', 'M',
                'M', 'M', 'M', 'M',
                'M', 'M', 'M', 'M'];
        }
        else
        {
            return this.boardRecycler.pop();
        }
    }
}
