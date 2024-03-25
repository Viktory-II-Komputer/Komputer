/// Setup file for tournaments and agents.

export const SETUP = {

    // Tournament
    AGENT_0 : "MCTS-UCT-ENHANCED", // Use Random, MCTS-UCT, MCTS-UCT-ENHANCED, or MCTS-PUCT
    AGENT_1 : "MCTS-PUCT", 
    GAME_TO_PLAY : "Checkers",  // Use TicTacToe or Checkers
    SHOULD_ALTERNATE_PLAY_ORDER : true, 
    MAX_TURNS_PER_GAME : 100,
    TOURNAMENT_LENGTH : 100,  // Should be >= 1 game.

    // MCTS-UCT
    SEARCH_TIME : 3000,  // In milliseconds: 1000 == 1 second. If debugging with break points, set to NUMBER.MAX_VALUE.
    MAX_ITERATIONS : Number.MAX_VALUE,  // If using break points, set this, not time. For one second, try 3-4 million.
    UCB_FORMULA_CONSTANT : 2,  // Controls exploit-explore ratio, where 0 is greedy.
    
    // MCTS-UCT Enhanced: Depth-Limited Evaluation & Tree Size Limits
    TREE_DEPTH_LIMIT: 18, 
    SIMULATION_DEPTH_LIMIT: 4, // Research says for many games, 4-8 is ideal. 
    ROOT_DEPTH_1_CHILD_CAPACITY: 64, 
    NODE_DEPTH_2_CHILD_CAPACITY: 8,
    NODE_GENERAL_CHILD_CAPACITY: 8,  

    // MCTS-PUCT: same controls - to set no limit, use Number.MAX_VALUE;
    PUCT_TREE_DEPTH_LIMIT: 18,  
    PUCT_SIMULATION_DEPTH_LIMIT: 4,  
    PUCT_ROOT_DEPTH_1_CHILD_CAPACITY: 64, 
    PUCT_NODE_DEPTH_2_CHILD_CAPACITY: 8,
    PUCT_NODE_GENERAL_CHILD_CAPACITY: 8,  

    // Rewards expects positive numbers.
    REWARD : {
        TIE :  1,
        WIN :  2
    }
}
