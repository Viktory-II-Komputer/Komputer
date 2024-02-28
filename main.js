import { Agent } from './agent.js';
import { Game } from './game.js';

const GAME_TO_PLAY  = "Checkers"  // "TicTacToe"
const AGENT_TYPE = "Random"

// Initialization 
let game = new Game(GAME_TO_PLAY);
let agent = new Agent(AGENT_TYPE); 

agent.begin(game);

// Update loop
let [turnCount, turnMax] = [0, 200];
while(game.hasWinner === false && turnCount < turnMax) 
{
    agent.continue();
    agent.isPlayer1 = !agent.isPlayer1;
}

console.log("");
console.log("End script.");
