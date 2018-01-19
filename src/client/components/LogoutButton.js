import React, { Component } from 'react';
import { connect } from 'react-redux'
import { logout } from '../actions/auth';

class LogoutButton extends Component {
  render() {
    let { children } = this.props;
    return (
      <div id={this.props.id} onClick={this.props.logout}>
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

export default connect(null, mapDispatchToProps)(LogoutButton);
