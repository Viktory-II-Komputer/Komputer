export function State(board, isPlayer1)
{
    let state = isPlayer1? [1] : [0];
    for (const character of board)
    {
      switch (character)
      {
        case "+":
          state.push(0.5);
          break;
        case "W":
          state.push(0.36);
          break;
        case "M":
          state.push(0.64);
          break;
        case "K":
          state.push(0.82);
          break;
        case "Q":
            state.push(0.18);
          break;
        default:
          console.error("Bad board input. Expected +,W,M,K,Q. Got: " + character);
        }
    }
    return state;
} 
