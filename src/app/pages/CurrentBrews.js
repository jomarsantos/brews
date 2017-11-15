import React, { Component } from 'react';
import { connect } from 'react-redux'
import Main from '../containers/Main';

class CurrentBrews extends Component {
  render() {
    return (
			<div>
				<Main />
			</div>
    );
  }
}

export default connect(null, null)(CurrentBrews);
