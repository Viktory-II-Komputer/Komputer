/// Setup file for tournaments and agents.
export const SETUP = {

    // Tournament 
    AGENT_0 : "MCTS-UCT", // Use Random, MCTS-UCT, MCTS-UCT-ENHANCED, MCTS-PUCT, or MCTS-PUCT-NET
    AGENT_1 : "MCTS-PUCT-NET", 
    GAME_TO_PLAY : "Checkers",  // Use TicTacToe or Checkers
    SHOULD_ALTERNATE_PLAY_ORDER : true, 
    MAX_TURNS_PER_GAME : 100,
    TOURNAMENT_LENGTH : 20,  // Should be >= 1 game
    
    // For all (non-random) agents 
    SEARCH_TIME : 3000, // In milliseconds: 1000 == 1 second. If debugging with break points, set to NUMBER.MAX_VALUE.
    MAX_ITERATIONS : Number.MAX_VALUE, //Number.MAX_VALUE,  // If using break points, set this, not time. 
    UCB_FORMULA_CONSTANT : 2,  // Controls exploit-explore ratio, where 0 is greedy.
    
    // MCTS-UCT Enhanced: Depth-Limited Evaluation & Tree Size Limits
    TREE_DEPTH_LIMIT: 18, // For no limit, use Number.MAX_VALUE;
    SIMULATION_DEPTH_LIMIT: 4, // Research says for many games, 4-8 is ideal. 
    ROOT_DEPTH_1_CHILD_CAPACITY: 64, 
    NODE_DEPTH_2_CHILD_CAPACITY: 8,
    NODE_GENERAL_CHILD_CAPACITY: 8,  
    
    // MCTS-PUCT: same controls 
    PUCT_TREE_DEPTH_LIMIT: Number.MAX_VALUE,  
    PUCT_SIMULATION_DEPTH_LIMIT: 4,  
    PUCT_ROOT_DEPTH_1_CHILD_CAPACITY: 64, 
    PUCT_NODE_DEPTH_2_CHILD_CAPACITY: 64,
    PUCT_NODE_GENERAL_CHILD_CAPACITY: 64,  
    
    // MCTS-PUCT-NET
    NETWORK_PATH: "./network/checkers_net_sim-based_3_29_2024_2129.json",

    // Rewards: expects positive numbers
    REWARD : {
        TIE :  1,
        WIN :  2
    }
}

export async function NeuralNet(logname)
{
    return await (fetch(SETUP.NETWORK_PATH)
        .then(response => response.json())
            .then(async data =>  { 
                await import("https://cdn.rawgit.com/BrainJS/brain.js/45ce6ffc/browser.js");
                console.log(`${logname} initializing neural network.`);
                let net = new brain.NeuralNetwork({ inputSize: 33, hiddenLayers: [48, 32, 16, 4], outputSize: 1, activation: 'relu' });
                net.fromJSON(data);
                return net;        
        }).catch(error => console.error(error))
    );
}
