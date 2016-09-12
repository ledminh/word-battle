import React from 'react';

require('./main.sass');

import MainFunctions from './functions';

import GameScreen from './modules/game_screen/index';
import Footer from './modules/footer/index';
import PlayerList from './modules/players_list/index';
import ErrorPanel from './modules/error_panel/index';
import Rule from './modules/rule/index';

const Main = (props) => (
  <div className="main">
      <GameScreen showError={props.showError} socket={props.socket}/>
      <ErrorPanel />
      <Rule />
      <Footer />
      <PlayerList />
  </div>
);

export default MainFunctions(Main);
