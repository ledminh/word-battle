import {combineReducers, createStore} from 'redux';
import gameScreenReducer from './reducers/game_screen';
import errorReducer from './reducers/error';
import userInfoReducer from './reducers/user_info';
import playersListReducer from './reducers/players_list';
import playerInfoReducer from './reducers/playerInfo';

const reducers = combineReducers({
  gameScreen: gameScreenReducer,
  error: errorReducer,
  userInfo: userInfoReducer,
  playersList: playersListReducer,
  playerInfo: playerInfoReducer
});

const store = createStore(reducers);
export default store;
