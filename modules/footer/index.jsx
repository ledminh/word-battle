import React from 'react';

require ('./style.sass');

import store from '../../redux-store';
import {connect} from 'react-redux';

const Footer = (props) => (
  <div className="footer">
    <ControlPanel userName={props.userName} photo_url={props.photo_url}
                  score={props.score}/>
    <Advertisement />
  </div>

);

const ControlPanel = (props) => (
  <div className="control_panel">
      <div className="cp_profile_area">
          {(() =>
            {
              if(props.userName !== ""){
                return <ProfileArea userName={props.userName}
                photo_url={props.photo_url} />
              }
              else{
                return <FacebookLogin />
              }
            })()
          }
      </div>

      <div className="cp_score">
        <div className="cp_sc_title">SCORE</div>
        <div className="cp_sc_value">{props.score}</div>
      </div>

      <div className="cp_copyright">::: CREATED BY MINH LE :::</div>
  </div>
);

const FacebookLogin = (props) => (
    <div className="button_facebook" onClick={() => {window.location.href="/fb-login";}}>
      LOGIN BY FACEBOOK
    </div>
);

const ProfileArea = (props) => (
  <div className="cp_pa_profile">
    <div className="cp_pa_image"><img src={props.photo_url}/></div>
    <div className="cp_pa_welcome"><span className="cp_pa_wc_hello">Hello,</span> <span className="cp_pa_wc_name">{props.userName}</span></div>
    <div className="cp_pa_logout_button" onClick={() => {window.location.href="/logout";}}>Log out</div>
  </div>
);

const Advertisement = (props) => (
  <div className="advertisement">
      <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <ins className="adsbygoogle"
         style={{display:"inline-block",width:"728px",height:"90px"}}
         data-ad-client="ca-pub-5637984408924020"
         data-ad-slot="4562441993"></ins>
      <script>
      (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
  </div>
);

const mapStatesToProps = (store) => ({
  userName: store.userInfo.get("userName"),
  photo_url: store.userInfo.get("photo_url"),
  score: store.userInfo.get("score")
});


export default connect(mapStatesToProps)(Footer);
