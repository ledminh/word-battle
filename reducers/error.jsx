const Immutable = require('immutable');

const initState = Immutable.Map({
    on: false,
    reason: ""
});

const errorReducer = (state = initState, action) => {
  if(action.type === "ERROR_ON"){
    var newInfo = Immutable.Map({
      on: true,
      reason: action.reason
    });

    var newState = state.mergeDeep(newInfo);

    return newState;
  }
  else if(action.type === "ERROR_OFF"){
    var newInfo = Immutable.Map({
      on: false
    });
    
    var newState = state.mergeDeep(newInfo);

    return newState;
  }

  return state;
}

export default errorReducer;
