import React, { Component } from 'react';
import { connect } from 'react-redux'

class FacebookLogin extends Component {
	constructor(props, context){
		super(props, context);
		this.initializeFacebookLogin = this.initializeFacebookLogin.bind(this);
		this.checkLoginStatus = this.checkLoginStatus.bind(this);
		this.facebookLoginHandler = this.facebookLoginHandler.bind(this);
		this.facebookLogin = this.facebookLogin.bind(this);
  }

  componentDidMount() {
    document.addEventListener('FBObjectReady', this.initializeFacebookLogin);
  }

  componentWillUnmount() {
    document.removeEventListener('FBObjectReady', this.initializeFacebookLogin);
  }

  /**
   * Init FB object and check Facebook Login status
   */
  initializeFacebookLogin() {
    this.FB = window.FB;
    this.checkLoginStatus();
  }

  /**
   * Check login status
   */
  checkLoginStatus() {
    this.FB.getLoginStatus(this.facebookLoginHandler);
  }

  /**
   * Check login status and call login api is user is not logged in
   */
  facebookLogin() {
    if (!this.FB) return;

    this.FB.getLoginStatus(response => {
      if (response.status === 'connected') {
        this.facebookLoginHandler(response);
      } else {
        this.FB.login(this.facebookLoginHandler, {scope: 'public_profile'});
      }
    }, );
  }

  /**
   * Handle login response
   */
  facebookLoginHandler(response) {
    if (response.status === 'connected') {
      this.FB.api('/me', userData => {
        let result = {
          ...response,
          user: userData
        };
				console.log(result);
        this.props.onLogin(true, result);
      });
    } else {
      this.props.onLogin(false);
    }
  }

  render() {
    let {children} = this.props;
    return (
      <div onClick={this.facebookLogin.bind(this)}>
        {children}
      </div>
    );
  }
}

export default connect(null, null)(FacebookLogin);
