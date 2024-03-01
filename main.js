import { Agent } from './agent.js';
import { Game } from './game.js';

const GAME_TO_PLAY = "Checkers" // "TicTacToe" 
const AGENT_TYPE = "Random" // "MCTS-UCT"  
const MAX_TURN = 200;

// Initialization 
let game = new Game(GAME_TO_PLAY);
let agent = new Agent(AGENT_TYPE); 

agent.begin(game);

// Update loop
let turn = 0;
while (game.isDone === false && turn < MAX_TURN) 
{
    agent.continue(++turn);
    agent.isPlayer1 = !agent.isPlayer1;
}

console.log("End script.");
