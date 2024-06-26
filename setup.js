/// Setup file for tournaments and agents.
export const SETUP = {

    // Tournament 
    AGENT_0 : "MCTS-PUCT-NET", // Use Random, MCTS-UCT, MCTS-UCT-ENHANCED, MCTS-PUCT, or MCTS-PUCT-NET.
    AGENT_1 : "MCTS-PUCT", 
    GAME_TO_PLAY : "Checkers",  // Use TicTacToe or Checkers.
    SPECIFY_INITIAL_BOARD: null,  // Expects null (default) or string. Example TicTacToe string: "X--OO-X--"
    SHOULD_ALTERNATE_PLAY_ORDER : true, // Per game, switch sides.
    MAX_TURNS_PER_GAME : 1,  // Should be >=1 turn.
    TOURNAMENT_LENGTH : 1,  // Should be >= 1 game.
    
    // For all (non-random) agents 
    SEARCH_TIME : 1000, // In milliseconds: 1000 == 1 second. If debugging with break points, set to NUMBER.MAX_VALUE.
    MAX_ITERATIONS : Number.MAX_VALUE, // If using break points, set this, not time. 
    UCB_FORMULA_CONSTANT : 2,  // Controls exploit-explore ratio, where 0 is greedy.
    
    // MCTS-UCT Enhanced: Depth-Limited Evaluation & Tree Size Limits
    TREE_DEPTH_LIMIT: 18, // For no limit, use Number.MAX_VALUE;
    SIMULATION_DEPTH_LIMIT: 4, // Research says for many games, 4-8 is ideal. 
    ROOT_DEPTH_1_CHILD_CAPACITY: 64, 
    NODE_DEPTH_2_CHILD_CAPACITY: 8,
    NODE_GENERAL_CHILD_CAPACITY: 8,  
    
    // MCTS-PUCT: same controls 
    PUCT_TREE_DEPTH_LIMIT: 18,  
    PUCT_SIMULATION_DEPTH_LIMIT: 4,  
    PUCT_ROOT_DEPTH_1_CHILD_CAPACITY: 64, 
    PUCT_NODE_DEPTH_2_CHILD_CAPACITY: 12,
    PUCT_NODE_GENERAL_CHILD_CAPACITY: 8,  
    
    // MCTS-PUCT-NET
    NETWORK_PATH: "./network/checkers_net_sim-based_4-5-2024_1601-10m.json",
    HIDDEN_LAYERS: [36, 16, 4],
    PUCT_NET_TREE_DEPTH_LIMIT: 18,  
    PUCT_NET_SIMULATION_DEPTH_LIMIT: 5,  
    PUCT_NET_ROOT_DEPTH_1_CHILD_CAPACITY: 64, 
    PUCT_NET_NODE_DEPTH_2_CHILD_CAPACITY: 12,
    PUCT_NET_NODE_GENERAL_CHILD_CAPACITY: 8,  

    // Rewards: expects positive numbers
    REWARD : {
        TIE :  1,
        WIN :  2
    }
}

export async function NeuralNet() 
{
    return await (fetch(SETUP.NETWORK_PATH)
        .then(response => response.json())
            .then(async data =>  { 
                await import("./network/browser.js"); // To import from the web, use: import("https://cdn.rawgit.com/BrainJS/brain.js/45ce6ffc/browser.js");
                let net = new brain.NeuralNetwork({ inputSize: 33, hiddenLayers: SETUP.HIDDEN_LAYERS, outputSize: 1, activation: 'relu' });
                net.fromJSON(data);
                return net;        
        }).catch(error => console.error(error))
    );
}
