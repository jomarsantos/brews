import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import UserDetailContainer from '../containers/UserDetailContainer';

class UserMain extends Component {
  render() {
    return (
			<div id='currentBrewsMain'>
				<Header />
				<UserDetailContainer />
			</div>
    );
  }
}

export default connect(null, null)(UserMain);
