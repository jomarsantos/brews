import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { logout } from '../actions/auth';

class LogoutButton extends Component {
	logout() {
		this.props.logout();
		if (this.props.history.location.pathname === '/user') {
			this.props.history.push('/')
		}
	}

  render() {
    let { children } = this.props;
    return (
      <div id={this.props.id} onClick={() => this.logout()}>
        { children }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(LogoutButton));
