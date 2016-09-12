var Immutable = require('immutable');

const initState = Immutable.Map({
  userName: "",
  photo_url: "",
  score: 0,
  facebookID: ""
});

const userInfoReducer = (state = initState, action) => {
    if(action.type === "CHANGE_USER_INFO"){
        var newInfo = Immutable.Map({
          userName: action.userName,
          photo_url: action.photo_url,
          score: action.score,
          facebookID: action.facebookID
        });

        var newState = state.mergeDeep(newInfo);
        return newState;
    }
    if(action.type === "UPDATE_SCORE"){
      var newInfo = Immutable.Map({
        score: action.score
      });

      var newState = state.mergeDeep(newInfo);
      return newState;
    }

    return state;
}

export default userInfoReducer;
