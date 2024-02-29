import { Agent } from './agent.js';
import { Game } from './game.js';

const GAME_TO_PLAY = "TicTacToe" // "Checkers" // 
const AGENT_TYPE = "Random"

// Initialization 
let game = new Game(GAME_TO_PLAY);
let agent = new Agent(AGENT_TYPE); 

agent.begin(game);

// Update loop
let [turn, turnMax] = [0, 200];
while(game.hasWinner === false && turn < turnMax) 
{
    agent.continue(++turn);
    agent.isPlayer1 = !agent.isPlayer1;
}

console.log("End script.");
