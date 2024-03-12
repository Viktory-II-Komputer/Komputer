/// Setup file for tournaments and agents.

export const SETUP = {

    // Tournament
    AGENT_0 : "MCTS-UCT", // Agent who plays the first game first. Use MCTS-UCT or Random.
    AGENT_1 : "Random", 
    SHOULD_ALTERNATE_PLAY_ORDER : false,
    GAME_TO_PLAY : "TicTacToe", // Use TicTacToe or Checkers
    MAX_TURNS_PER_GAME : 200,
    TOURNAMENT_LENGTH : 100,  // Should be >= 1 game.

    // MCTS
    SEARCH_TIME : 1000,  // In milliseconds: 1000 == 1 second. If debugging with break points, set to NUMBER.MAX_VALUE.
    MAX_ITERATIONS : Number.MAX_VALUE,  // If using break points, set this, not time. For one second, try 3-4 million.
    UCB_FORMULA_CONSTANT : 2,  // Controls exploit-explore ratio, where zero is greedy.

    /*  Rewards to Select, Simulate, and Expand.

        Currently, only the tie reward should be modified.
        The Select function expects Player2 to get a negative reward for a win.
        Changing Player2's sign or relative size requires modifying the Select function.
        Specifically, change the PLAYER_MULTIPLIER and possibly the search for max / min child.
    */
    REWARD : {
        PLAYER1_TIE :  0.5,
        PLAYER2_TIE : -0.5,
        PLAYER1_WIN :  1,
        PLAYER2_WIN : -1
    }
}
