
export function simulate(child)
{
    child.visitCount++; 
    let result = 0;
    let isWinner = getPlayer1IsWinner(child.board, child.isPlayer1);
    if (isWinner !== null)
    {
        result = child.isPlayer1? 1 : -1;
        child.sumValue += result; 
    }
    return result;
}

// Return true for a player1 win or false for a loss, null if none. 
function getPlayer1IsWinner(board, isPlayer1)
{

    return
}
