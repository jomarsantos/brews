import React, { Component } from 'react';
import { connect } from 'react-redux'

class UserDetailContainer extends Component {
	render() {
		return (
			<div id='userDetailContainer-main'>
				<h2>Favorites</h2>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, null)(UserDetailContainer);
