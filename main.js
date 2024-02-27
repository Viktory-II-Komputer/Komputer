import { Agent } from './agent.js';
import { Game } from './game.js';

const GAME_TO_PLAY  = "checkers"  // "TicTacToe"
const AGENT_TYPE = "Random"

// Initialization 
let game = new Game(GAME_TO_PLAY);
let agent = new Agent(AGENT_TYPE); 

agent.begin(game, true);

// Update loop
let [turnCount, TURN_MAX] = [0, 200];
while(game.hasWinner === false && turnCount < TURN_MAX) 
{
    agent.continue();
    agent.isPlayer1 = !agent.isPlayer1;
    console.log("End turn: " + ++turnCount);
}

console.log("");
console.log("End script.");
