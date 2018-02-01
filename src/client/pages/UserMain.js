import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import UserDetailContainer from '../containers/UserDetailContainer';
import UserFavoritesContainer from '../containers/UserFavoritesContainer';

class UserMain extends Component {
	componentDidMount() {
		document.title = "Brews | " + this.props.user.name;
	}

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

const mapStateToProps = (state) => {
  return {
		user: state.user
  };
}

export default connect(mapStateToProps, null)(UserMain);
