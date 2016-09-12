import React from 'react';

import store from '../../redux-store';
import {connect} from 'react-redux';
var d3 = require('d3');

function PlayerListFunction(PlayerList) {
  class PlayerListWrapper extends React.Component {
    constructor(props){
        super(props);

        //Binding
        this.playerTagOnMouseOver = this.playerTagOnMouseOver.bind(this);
    }

    playerTagOnMouseOver(index){
        var offset = document.getElementById('pl_tag_' + index).getBoundingClientRect();

        var playerInfo = d3.select('.pl_playerInfo');

        store.dispatch({
          type: "LOAD_PLAYER_INFO",
          userName: this.props.playersList[index].name,
          userScore: this.props.playersList[index].score,
          userLastWord: this.props.playersList[index].lastWord
        });


        playerInfo.style("display", "block")
                  .style("right", window.innerWidth - (offset.left - 5) + "px")
                  .style("top", offset.top + "px");
    }

    playerTagOnMouseLeave(event){
      d3.select('.pl_playerInfo').style("display", "none");
    }

    render() {
      return (
        <PlayerList playersList={this.props.playersList}
                    playerTagOnMouseOver={this.playerTagOnMouseOver}
                    playerTagOnMouseLeave={this.playerTagOnMouseLeave}
                    userName={this.props.userName}  userScore={this.props.userScore}
                    userLastWord={this.props.userLastWord}/>
      );
    }
  }

  const mapStatesToProps = (store) => ({
      playersList: store.playersList,
      userName: store.playerInfo.get("userName"),
      userScore: store.playerInfo.get("userScore"),
      userLastWord: store.playerInfo.get("userLastWord")
  });

  return connect(mapStatesToProps)(PlayerListWrapper);
}

export default PlayerListFunction;
