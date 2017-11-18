import React, { Component } from 'react';
import { connect } from 'react-redux'
import CurrentBrewsContainer from '../containers/CurrentBrewsContainer';

class CurrentBrewsMain extends Component {
  render() {
    return (
			<div id='currentBrewsMain'>
				<CurrentBrewsContainer />
			</div>
    );
  }
}

export default connect(null, null)(CurrentBrewsMain);
