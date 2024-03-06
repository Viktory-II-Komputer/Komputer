
/// Functions for random behavior.

export function GetRandomNextBoard(rules)
{
    const MAX = rules.nextPossibleBoards.length;
    const RANDOM_INDEX = getRandomIndexExclusive(MAX);
    return rules.nextPossibleBoards[RANDOM_INDEX];
}

// Returns random integer between [zero, max).
function getRandomIndexExclusive(max)
{
    return Math.floor(Math.random() * max);
}
