import React from 'react';

require('./style.sass');

import store from '../../redux-store';
import {connect} from 'react-redux';

const Rule = (props) => (
    <div className={"rule " + ((props.userName === "")? "" : "hidden")}>
      <div className="header">WORD BATTLE</div>
      <div className="body">
          <ul>
              <li>Log in by Facebook to play.</li>
              <li>To add word: the first letter of your word must be the
            same as the last letter of the current word.</li>
              <li>When your word is added successfully, the score you'll get
            is equal to the number of letters of your word.</li>
              <li>When someone adds their word successfully, the score you'll
            lose is equal to the number of letters of their word.</li>
              <li>If your score is 0, your name will be kicked out from the list.</li>
          </ul>
         <p>ENJOY AND HAVE FUN !!!!</p>
      </div>
    </div>
);

const mapStatesToProps = (store) => ({
    userName: store.userInfo.get('userName')
});


export default connect(mapStatesToProps)(Rule);
