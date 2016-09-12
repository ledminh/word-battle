import React from 'react';

var d3 = require('d3');
import store from './redux-store';
import axios from 'axios';

import {connect} from 'react-redux';

function MainFunctions(Main) {
    class MainWrapper extends React.Component {
      constructor(props){
          super(props);

          //Binding
          this._socketListener = this._socketListener.bind(this);
      }

      componentDidMount(){
        this._arrangePanels();
        d3.select(window).on("resize", this._arrangePanels);

        this._loadGameData();
        this._loadUserData();

        this._socketListener();
      }

      render(){
        return (<Main showError={this.showError} socket={this.props.socket}/>);
      }

      //==================
      //ERROR PANEL
      //==================
      showError(reason){
        store.dispatch({
          type: "ERROR_ON",
          reason: reason
        });

        setTimeout(() => {
          store.dispatch({
            type: "ERROR_OFF"
          });
        }, 800);
      }


      //==================
      //HELPERS
      //==================
      _arrangePanels(){
        var errorPanel = d3.select(".error_panel"),
            rule = d3.select('.rule');

        var innerWidth = window.innerWidth,
            innerHeight = window.innerHeight;

        errorPanel.style("top", innerHeight/3 + "px")
                  .style("left", (innerWidth/2 - 125) + "px");

        rule.style("top", innerHeight/7 + "px")
                  .style("left", (innerWidth/2 - 250) + "px");

      }

      _loadUserData(){
        axios.get("/check-user-info")
            .then((res) => {
              if(res.data.userName){
                store.dispatch({
                  type: "CHANGE_USER_INFO",
                  userName: res.data.userName,
                  photo_url: res.data.photo_url,
                  score: res.data.score,
                  facebookID: res.data.facebookID
                });
              }
              else{
                store.dispatch({
                  type: "CHANGE_USER_INFO",
                  userName: "",
                  photo_url: "",
                  score: 0
                });
              }
            });
      }

      _loadGameData(){
        axios.get("/load-game-data")
             .then((res) => {
               store.dispatch({
                 type: "LOAD_GAME_DATA",
                 name: res.data.currentWord,
                 definition: res.data.currentDef,
                 POS: res.data.currentPOS,
                 prevWords: res.data.prevWords,
                 wordsStack: res.data.wordsStack
               });

               store.dispatch({
                 type: "LOAD_PLAYER_LIST",
                 playersList: res.data.playersList
               });

             });
      }

      _socketListener(){
          this.props.socket.on("UPDATE_GAME_DATA_CLIENT", (data) => {

            store.dispatch({
              type: "CHANGE_SENDING_STATUS",
              sending: false
            });

            if(!data.updateStatus){
              return this.showError(data.reason);
            }


            store.dispatch({
              type: "LOAD_GAME_DATA",
              name: data.name,
              definition: data.definition,
              POS: data.POS,
              prevWords: data.prevWords,
              wordsStack: data.wordsStack
            });

            store.dispatch({
              type: "LOAD_PLAYER_LIST",
              playersList: data.playersList
            });

            var thisPlayer = data.playersList.find((player) => player.facebookID === this.props.facebookID);
            var score = 0;

            if(thisPlayer)
              score = thisPlayer.score;


            store.dispatch({
              type: "UPDATE_SCORE",
              score: score
            });


          });

      }

    }

    const mapStatesToProps = (store) => ({
        facebookID: store.userInfo.get("facebookID")
    });

    return connect(mapStatesToProps)(MainWrapper);
}


export default MainFunctions;
