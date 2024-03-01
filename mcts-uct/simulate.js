
export function simulate(child)
{
    child.visitCount++;    
    let result = getRandomGameResult(child.board, child.isPlayer1);
    child.sumValue += result;
    return result;
}

function getRandomGameResult(board, isPlayer1)
{

}
