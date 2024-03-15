/// Setup file for tournaments and agents.

export const SETUP = {

    // Tournament
    AGENT_0 : "MCTS-UCT",  // Agent who plays the first game first. Use MCTS-UCT or Random.
    AGENT_1 : "Random", 
    GAME_TO_PLAY : "TicTacToe",  // Use TicTacToe or Checkers
    SHOULD_ALTERNATE_PLAY_ORDER : false,  // Per game, swap who plays first.
    MAX_TURNS_PER_GAME : 200,
    TOURNAMENT_LENGTH : 100,  // Should be >= 1 game.

    // MCTS-UCT
    SEARCH_TIME : 1000,  // In milliseconds: 1000 == 1 second. If debugging with break points, set to NUMBER.MAX_VALUE.
    MAX_ITERATIONS : Number.MAX_VALUE,  // If using break points, set this, not time. For one second, try 3-4 million.
    UCB_FORMULA_CONSTANT : 2,  // Controls exploit-explore ratio, where zero is greedy.

    /*  Rewards to Simulate and Expand.
        Expects positive numbers.
    */
    REWARD : {
        TIE :  1,
        WIN :  2
    }
}
