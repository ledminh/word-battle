var Immutable = require('immutable');

const initState = Immutable.Map({
  textInputValue: "",
  currentWord: {
    name: "",
    definition: "",
    POS: ""
  },

  prevWords: "",

  wordsStack: [],

  sending: false
});

const gameScreenReducer = (state = initState, action) => {
    if(action.type === "CHANGE_INPUT"){
        var newState = state.set("textInputValue", action.value);
        return newState;
    }
    else if(action.type === "LOAD_GAME_DATA"){
      var newData = Immutable.Map({
          currentWord: {
            name: action.name.toUpperCase(),
            definition: action.definition,
            POS: action.POS
          },

          prevWords: action.prevWords,
          wordsStack: action.wordsStack
        });

         var newState = state.mergeDeep(newData);

         return newState;
    }
    if(action.type === "CHANGE_SENDING_STATUS"){
      var newData = Immutable.Map({
          sending: action.sending
        });

         var newState = state.mergeDeep(newData);

         return newState;
    }

    return state;
}

export default gameScreenReducer;
