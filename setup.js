/// Setup file for tournaments and agents.

export const SETUP = {

    // Tournament
    AGENT_0 : "MCTS-UCT-ENHANCED", // Use Random, MCTS-UCT, or MCTS-UCT-ENHANCED
    AGENT_1 : "MCTS-UCT", 
    GAME_TO_PLAY : "Checkers",  // Use TicTacToe or Checkers
    SHOULD_ALTERNATE_PLAY_ORDER : true,  // Per game, swap who plays first.
    MAX_TURNS_PER_GAME : 100,
    TOURNAMENT_LENGTH : 20,  // Should be >= 1 game.

    // MCTS-UCT
    SEARCH_TIME : 5000,  // In milliseconds: 1000 == 1 second. If debugging with break points, set to NUMBER.MAX_VALUE.
    MAX_ITERATIONS : Number.MAX_VALUE,  // If using break points, set this, not time. For one second, try 3-4 million.
    UCB_FORMULA_CONSTANT : 2,  // Controls exploit-explore ratio, where 0 is greedy.
    
    // MCTS-UCT Enhanced: Depth-Limited Evaluation & Tree Size Limits
    TREE_DEPTH_LIMIT: 12, 
    SIMULATION_DEPTH_LIMIT: 4, // Research says for many board games, 4-8 is ideal. 
    ROOT_CHILDREN_CAPACITY: 64, // Depth 1 children
    NODE_CHILDREN_CAPACITY: 8, // Depth 2 or greater 

    // Rewards expects positive numbers.
    REWARD : {
        TIE :  1,
        WIN :  2,
    }
}
