import ReactDOM from 'react-dom';
import React from 'react';
import Main from './main';

import {Provider} from 'react-redux';
import store from './redux-store';

var socket = io('http://localhost:8080');


ReactDOM.render(<Provider store={store}><Main socket={socket} /></Provider>, document.getElementById("app"));
