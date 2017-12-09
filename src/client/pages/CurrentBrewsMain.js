import React, { Component } from 'react';
import { connect } from 'react-redux'
import Header from '../components/Header';
import CurrentBrewsContainer from '../containers/CurrentBrewsContainer';

class CurrentBrewsMain extends Component {
  render() {
    return (
			<div id='currentBrewsMain'>
				<Header />
				<CurrentBrewsContainer />
			</div>
    );
  }
}

export default connect(null, null)(CurrentBrewsMain);
