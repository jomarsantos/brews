import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class UserMain extends Component {
  render() {
    return (
			<div id='currentBrewsMain'>
				<Header />
			</div>
    );
  }
}

export default connect(null, null)(UserMain);
