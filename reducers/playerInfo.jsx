var Immutable = require('immutable');

const initState = Immutable.Map({
  userName: "",
  userScore: "",
  userLastWord: ""
});

const playerInfoReducer = (state = initState, action) => {
  if(action.type === "LOAD_PLAYER_INFO"){
      var newInfo = Immutable.Map({
        userName: action.userName,
        userScore: action.userScore,
        userLastWord: action.userLastWord
      });

      var newState = state.mergeDeep(newInfo);
      
      return newState;
  }

  return state;
}

export default playerInfoReducer;
