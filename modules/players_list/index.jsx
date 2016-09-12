import React from 'react';

require('./style.sass');

import PlayerListFunction from './functions';

const PlayerList = (props) => (
  <div className="players_list">
    <div className="pl_header">PLAYERS LIST</div>
    <div className="pl_body">
      {
        (() => {  
        var results = [];
        props.playersList.forEach((player, i) => {
          results.push(<PlayerTag key={i} index={i} playerName={player.name}
                        playerImage_url={player.photo} playerScore={player.score} playerTagOnMouseLeave={props.playerTagOnMouseLeave}
                        playerTagOnMouseOver={props.playerTagOnMouseOver}/>);
                      });

        return results;
        })()
      }
      <PlayerInfo userName={props.userName} userScore={props.userScore} userLastWord={props.userLastWord}/>
    </div>
  </div>
);

const PlayerInfo = (props) => (
  <div className="pl_playerInfo">
    <div className="header">{props.userName}</div>
    <div className="body">
      <p className="score"><span className="title">SCORE:</span> <span className="value">{props.userScore}</span></p>
      <p className="last_word"><span className="title">LAST WORD:</span> <span className="value">{props.userLastWord}</span></p>

    </div>
  </div>
);

const PlayerTag = (props) => (
  <div className="pl_tag" id={"pl_tag_" + props.index} onMouseOver={()=>{props.playerTagOnMouseOver(props.index)}}
              onMouseLeave={props.playerTagOnMouseLeave}>
    <span className="pl_tag_image"><img src={props.playerImage_url}/></span>
    <span className="pl_tag_name">{props.playerName}</span>
    <span className="pl_tag_score">{props.playerScore}</span>
  </div>
);



export default PlayerListFunction(PlayerList);
