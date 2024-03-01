
export function simulate(child)
{
    let result = getRandomGameResult(child.board, child.isPlayer1);
    child.sumValue += result;
    child.visitCount++;    
    return result;
}