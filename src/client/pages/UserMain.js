import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import Header from '../components/Header';
import UserDetailContainer from '../containers/UserDetailContainer';
import UserFavoritesContainer from '../containers/UserFavoritesContainer';

class UserMain extends Component {

	componentDidMount() {
		if (this.props.user.id) {
			document.title = "Brews | " + this.props.user.name;
		} else {
			this.props.history.push('/')
		}
	}

  render() {
    return (
			<div id='userMain'>
				<Header />
				<h1 id='pageTitle'>MY FAVORITES</h1>
				<UserFavoritesContainer />
			</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
		user: state.user
  };
}

export default withRouter(connect(mapStateToProps, null)(UserMain));
