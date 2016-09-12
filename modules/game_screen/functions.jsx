import React from 'react';

import store from '../../redux-store';
import {connect} from 'react-redux';
import axios from 'axios';


function GameScreenFunctions (GameScreen) {
   class GameScreenWrapper extends React.Component {
    constructor(props){
        super(props);

        //Binding
        this.textInputOnKeyDown = this.textInputOnKeyDown.bind(this);
        this._validInput = this._validInput.bind(this);
        this.updateGameState = this.updateGameState.bind(this);
    }

    //================
    //TEXTINPUT functions
    //================
    textInputOnChange(event){
      store.dispatch({
        type: "CHANGE_INPUT",
        value: event.target.value.toUpperCase()
      });
    }

    textInputOnKeyDown(event){
        if(this.props.userName === ""){
            this.props.showError("You should log in first.");
            return;
        }

        if(this.props.sending){
          this.props.showError("Please wait !!! We are processing your word ...");
          return;
        }

        if(event.keyCode === 13){ //ENTER
            if(this._validInput()){
              store.dispatch({
                  type: "CHANGE_SENDING_STATUS",
                  sending: true
              });

              this.updateGameState();

            }

            store.dispatch({
              type: "CHANGE_INPUT",
              value: ""
            });
        }
    }

    //================
    // WordDefinition functions
    //================
    updateGameState(){
      //LOAD DEFINITION
      axios.get("/get-word/?word=" + this.props.textInputValue)
           .then((resGETWORD) => {

             if(resGETWORD.data.definition){

               var prevWords = this.props.prevWords
                                  + this.props.currentWord.name.slice(0, this.props.currentWord.name.length - 1);

                if(prevWords.length + resGETWORD.data.name.length > 15){
                  var numCharCut = prevWords.length + resGETWORD.data.name.length - 15;

                  prevWords = prevWords.slice(numCharCut);
                }


                this.props.socket.emit("UPDATE_GAME_DATA_SERVER", {
                  currentWord: resGETWORD.data.name,
                  currentDef: resGETWORD.data.definition,
                  currentPOS: resGETWORD.data.POS,
                  prevWords: prevWords,
                  scoredPlayer_facebookID: this.props.facebookID
                });


             }
             else {
               this.props.showError("Your word is not on the dictionary");
             }
           });

    }

    //================
    //HELPER functions
    //================
    _validInput(){
      if(this.props.textInputValue.length < 2){
        this.props.showError("The word must have at least 2 letters");
        return false;
      }

      if(this.props.currentWord.name !== "" && this.props.textInputValue[0].toUpperCase()
        !== this.props.currentWord.name[this.props.currentWord.name.length - 1]){
          this.props.showError("The first letter of your word must match the last letter of the previous word");
          return false;
        }

      if(!/^[a-zA-Z]+$/.test(this.props.textInputValue)){
        this.props.showError("Your word must contain only letters in the alphabet.");
        return false;
      }

      if(this.props.wordsStack.indexOf(this.props.textInputValue) !== -1){
        this.props.showError("Your word cannot be one of the 5 words that have been entered recently.");
        return false;
      }

      return true;
    }

    render() {
      return (
        <GameScreen textInputValue={this.props.textInputValue}
                    textInputOnChange={this.textInputOnChange}
                    textInputOnKeyDown={this.textInputOnKeyDown}
                    wordName={this.props.currentWord.name}
                    POS={this.props.currentWord.POS}
                    definition={this.props.currentWord.definition}
                    prevWords={this.props.prevWords}
                    currentWord={this.props.currentWord.name}
                    userName={this.props.userName}
                    sending={this.props.sending}/>
      );
    }
  }

  const mapStatesToProps = (store) => ({
      textInputValue: store.gameScreen.get("textInputValue"),
      currentWord: store.gameScreen.get("currentWord"),
      prevWords: store.gameScreen.get("prevWords"),
      userName: store.userInfo.get("userName"),
      facebookID: store.userInfo.get('facebookID'),
      wordsStack: store.gameScreen.get("wordsStack"),
      sending: store.gameScreen.get("sending")
  });

  return connect(mapStatesToProps)(GameScreenWrapper);
}

export default GameScreenFunctions;
