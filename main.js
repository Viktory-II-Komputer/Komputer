import { Agent } from './agent.js';
import { Game } from './game.js';

const GAME_TO_PLAY  = "checkers"  // "TicTacToe"
const AGENT_TYPE = "Random"

// Initialization 
let game = new Game(GAME_TO_PLAY);
let agent = new Agent(AGENT_TYPE); 

agent.begin(game);

// Update loop
while(game.hasWinner === false) 
{
    agent.continue();
}

console.log("End script.");
