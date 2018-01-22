import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchCurrentBrews } from '../actions/currentBrews';

class UserDetailContainer extends Component {
	componentDidMount() {
		if (this.props.brews.length === 0) {
			this.props.fetchCurrentBrews();
		}
	}

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
    user: state.user,
		brews: state.currentBrews.brews
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentBrews: () => {
      dispatch(fetchCurrentBrews());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailContainer);
