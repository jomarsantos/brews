import React, { Component } from 'react';
import { connect } from 'react-redux'
import AllCurrentBrewsBody from '../containers/AllCurrentBrewsBody';

class AllCurrentBrews extends Component {
  render() {
    return (
			<div id='main'>
				<AllCurrentBrewsBody />
			</div>
    );
  }
}

export default connect(null, null)(AllCurrentBrews);
