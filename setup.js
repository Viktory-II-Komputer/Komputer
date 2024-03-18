/// Setup file for tournaments and agents.

export const SETUP = {

    // Tournament
    AGENT_0 : "MCTS-UCT-DEPTH-MEMORY", // Use Random, MCTS-UCT, or MCTS-UCT-DEPTH-MEMORY
    AGENT_1 : "Random", 
    GAME_TO_PLAY : "TicTacToe",  // Use TicTacToe or Checkers
    SHOULD_ALTERNATE_PLAY_ORDER : false,  // Per game, swap who plays first.
    MAX_TURNS_PER_GAME : 200,
    TOURNAMENT_LENGTH : 2,  // Should be >= 1 game.

    // MCTS-UCT
    SEARCH_TIME : 1000,  // In milliseconds: 1000 == 1 second. If debugging with break points, set to NUMBER.MAX_VALUE.
    MAX_ITERATIONS : Number.MAX_VALUE,  // If using break points, set this, not time. For one second, try 3-4 million.
    UCB_FORMULA_CONSTANT : 2,  // Controls exploit-explore ratio, where zero is greedy.
    
    // MCTS-UCT Depth & Memory Limits
    CHILDREN_CAPACITY_PER_NODE: 2E6,  // 2 million - will only affect huge games.

    // Rewards expects positive numbers.
    REWARD : {
        TIE :  1,
        WIN :  2
    }
}
