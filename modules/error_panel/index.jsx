import React from 'react';

require('./style.sass');

import store from '../../redux-store.jsx';
import {connect} from 'react-redux';

const ErrorPanel = (props) => (
  <div className={"error_panel " + (props.errorOn? "" : "hidden")}>
    <div className="ep_header">ERROR</div>
    <div className="ep_body">{props.errorReason}</div>
  </div>
);

const mapStatesToProps = (store) => ({
  errorOn: store.error.get("on"),
  errorReason: store.error.get("reason")
});

export default connect(mapStatesToProps)(ErrorPanel);
