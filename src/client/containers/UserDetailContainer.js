import React, { Component } from 'react';
import { connect } from 'react-redux'

class UserDetailContainer extends Component {
	render() {
		return (
			<div id='userDetailContainer-main'>
				<img id='userDetailContainer-image' src={this.props.user.picture}/>
				<h1 id ='userDetailContainer-name'>{this.props.user.name}</h1>
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
