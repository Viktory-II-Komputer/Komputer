
/// Functions for random behavior.

// Gets random item from Array
export function GetRandomNextBoard(rules)
{
    const MAX = rules.nextPossibleBoards.length;
    const RANDOM_INDEX = getRandomIndexExclusive(MAX);
    return rules.nextPossibleBoards[RANDOM_INDEX];
}

// Returns random key from Set or Map.
// Source: https://stackoverflow.com/questions/42739256/how-get-random-item-from-es6-map-or-set
export function GetRandomKey(collection) {
    let counter = 0;
    const RANDOM_INDEX = getRandomIndexExclusive(collection.size);
    for (let key of collection.keys()) {
        if (counter++ === RANDOM_INDEX) {
            return key;
        }
    }
}


// Returns random integer between [zero, max).
function getRandomIndexExclusive(max)
{
    return Math.floor(Math.random() * max);
}

