import React, { Component } from 'react';
import { connect } from 'react-redux'
import { login } from '../actions/auth';

class LoginButton extends Component {
	constructor(props, context){
		super(props, context);
		this.facebookLoginHandler = this.facebookLoginHandler.bind(this);
		this.login = this.login.bind(this);
  }

  login() {
		this.FB = window.FB;
		// TODO: check local storage for data
    if (!this.FB) {
			console.log('here');
			return;
		} else {
			this.FB.login(this.facebookLoginHandler, {
				auth_type: 'reauthenticate',
				scope: 'public_profile'
			});
		}
  }

  facebookLoginHandler(response) {
    if (response.status === 'connected') {
			this.props.login(response.authResponse.userID, response.authResponse.accessToken);
    } else {
			// TODO: error logging in
    }
  }

  render() {
    let {children} = this.props;
    return (
      <div onClick={this.login.bind(this)}>
        {children}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (userId, accessToken) => {
      dispatch(login(userId, accessToken));
    }
  }
}

export default connect(null, mapDispatchToProps)(LoginButton);
