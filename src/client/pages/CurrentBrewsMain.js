import React, { Component } from 'react';
import { connect } from 'react-redux'
import Header from '../components/Header';
import CurrentBrewsFilter from '../containers/CurrentBrewsFilter';
import CurrentBrewsContainer from '../containers/CurrentBrewsContainer';
import FacebookLoginButton from '../components/FacebookLoginButton';

class CurrentBrewsMain extends Component {
	onFacebookLogin(loginStatus, resultObject) {
    if (loginStatus === true) {
			alert('Success');
    } else {
      // alert('Facebook login error');
    }
  }

  render() {
    return (
			<div id='currentBrewsMain'>
				<Header />
					<FacebookLoginButton onLogin={this.onFacebookLogin}>
            <button>Facebook</button>
          </FacebookLoginButton>
				<CurrentBrewsFilter />
				<CurrentBrewsContainer />
			</div>
    );
  }
}

export default connect(null, null)(CurrentBrewsMain);
