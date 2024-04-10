import { SETUP } from "./setup.js";
import { Agent } from './agent.js';
import { Game } from './game.js';

const MAX_TURN = SETUP.MAX_TURNS_PER_GAME;
const MAX_GAME_COUNT = SETUP.TOURNAMENT_LENGTH;
const SHOULD_ALTERNATE_PLAY_ORDER = SETUP.SHOULD_ALTERNATE_PLAY_ORDER;

// Initialization 
let game = new Game(SETUP.GAME_TO_PLAY);
let agents = [new Agent(SETUP.AGENT_0), new Agent(SETUP.AGENT_1)];
await agents[0].begin(game);
await agents[1].begin(game, false);
//updateDisplay();  Example front-end update.

// Tournament Loop
const LAST_GAME_COUNT = MAX_GAME_COUNT - 1;
for (let gameCount = 0; gameCount < MAX_GAME_COUNT; gameCount++)
{
    let currentAgent = getFirstAgent(agents); 
    let turn = 0;
    // Game Turn Loop
    while (game.isDone === false && turn < MAX_TURN) 
    {
        currentAgent.continue(++turn);
        currentAgent = getNextAgent(agents, currentAgent);  
    }
    console.log(`End game %s.`, gameCount + 1);

    // Increment wins
    if (!wasTie(game)) 
    {
        if (didAgentZeroWin(game)) 
        {
            agents[0].winCount++;
        }
        else
        {
            agents[1].winCount++;
        }
    }   
    
    // If not last game, reset.
    if (gameCount !== LAST_GAME_COUNT)
    {
        console.log("Tournament update:");
        console.log(`%s wins: %s`, agents[0].logName, agents[0].winCount);
        console.log(`%s wins: %s`, agents[1].logName, agents[1].winCount);
        
        game = getNewGame();
        if (SHOULD_ALTERNATE_PLAY_ORDER)
        {
            agents[0].begin(game, agents[0].isPlayer1? false : true);
            agents[1].begin(game, agents[1].isPlayer1? false : true);    
        }
        else
        {
            agents[0].begin(game);
            agents[1].begin(game, false);
        }
    }
}

console.log("End tournament.");
console.log(`%s wins: %s`, agents[0].logName, agents[0].winCount);
console.log(`%s wins: %s`, agents[1].logName, agents[1].winCount);

/// End worker script.
/// Helper functions below.

function updateDisplay()
{
    self.postMessage("A message from the worker.");
}

function getNewGame()
{
    return new Game(SETUP.GAME_TO_PLAY);
}

function getFirstAgent(agents)
{
    return agents[0].isPlayer1? agents[0] : agents[1];
}

function getNextAgent(agents, currentAgent)
{
    // Swap agents, considering that agents may or may not alternate by game.  
    return agents[ (currentAgent.isPlayer1 && agents[0].isPlayer1 || !currentAgent.isPlayer1 && !agents[0].isPlayer1)? 1 : 0 ]; 
}

function wasTie(game)
{
    return (game.rules.winner.isPlayer1 === null);
}

function didAgentZeroWin(game)
{
    return (game.rules.winner.isPlayer1 && agents[0].isPlayer1 || !game.rules.winner.isPlayer1 && !agents[0].isPlayer1)
}
