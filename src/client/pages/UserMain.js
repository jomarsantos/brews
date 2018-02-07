import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import ReactGA from 'react-ga';
import Header from '../components/Header';
import UserDetailContainer from '../containers/UserDetailContainer';
import UserFavoritesContainer from '../containers/UserFavoritesContainer';

class UserMain extends Component {

	componentDidMount() {
		ReactGA.pageview(window.location.pathname);
		if (this.props.user.id) {
			document.title = "Brewing | " + this.props.user.name;
		} else {
			this.props.history.push('/')
		}
	}

  render() {
    return (
			<div id='userMain'>
				<Header />
				<h1 id='pageTitle'>MY FAVOURITES</h1>
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
