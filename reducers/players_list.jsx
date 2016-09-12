
const playersListReducer = (state = [], action) => {
  if(action.type === "LOAD_PLAYER_LIST"){
      return action.playersList;
  }

  return state;
}

export default playersListReducer;
