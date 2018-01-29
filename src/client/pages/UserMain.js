import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import UserDetailContainer from '../containers/UserDetailContainer';
import UserFavoritesContainer from '../containers/UserFavoritesContainer';

class UserMain extends Component {
  render() {
    return (
			<div id='userMain'>
				<Header />
				<UserDetailContainer />
				<UserFavoritesContainer />
			</div>
    );
  }
}

export default connect(null, null)(UserMain);
