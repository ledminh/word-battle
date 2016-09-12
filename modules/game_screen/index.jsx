import React from 'react';

require ('./style.sass');
import GameScreenFunctions from './functions';

const GameScreen = (props) => (
  <div className="game_screen">
    <WordDefinition  name={props.wordName} POS={props.POS} definition={props.definition}/>
    <BattleField prevWords={props.prevWords} currentWord={props.currentWord}/>
    <TextInput value={props.textInputValue} onChange={props.textInputOnChange}
              onKeyDown={props.textInputOnKeyDown} userName={props.userName}
              sending={props.sending}/>
  </div>
);

const WordDefinition = (props) => (
  <div className="gs_word_def">
    <p className="gs_wd_header">
      <span className="gs_wd_name">{props.name} </span>
      <span className="gs_wd_type">{(props.POS? ("(" + props.POS + ")") : "")}</span>
    </p>

    <p className="gs_wd_body">{props.definition}</p>
  </div>
);

const BattleField = (props) => (
  <div className="battle_field">
    <span className="bf_prev_words">{props.prevWords}</span>
    <span className="bf_current_word">{props.currentWord}</span>
  </div>
);

const TextInput = (props) => (
  <div className="text_input_wrapper">
    <input className="text_input" type="text"
    name="text_input" placeholder="TYPE YOUR WORD ..."
    value={props.value} onChange={props.onChange}
    onKeyDown={props.onKeyDown} readOnly={(props.userName !== "" && !props.sending)? "" : "readonly"} />
  </div>
);



export default GameScreenFunctions(GameScreen);
