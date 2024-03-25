
/// Functions for random behavior.

export function GetRandomNextBoard(nextPossibleBoards)
{
    const MAX = nextPossibleBoards.length;
    const RANDOM_INDEX = getRandomIndexExclusive(MAX);
    return nextPossibleBoards[RANDOM_INDEX];
}

// Returns random key from Set or Map.
// Source: https://stackoverflow.com/questions/42739256/how-get-random-item-from-es6-map-or-set
// This is slow O(n), so if there's a lot of keys, better take one of the first few keys,
// Or use a data structure that supports random access.
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
