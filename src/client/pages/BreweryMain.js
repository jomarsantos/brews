import React, { Component } from 'react';
import { connect } from 'react-redux'
import Header from '../components/Header';
import BreweryDetailContainer from '../containers/BreweryDetailContainer';
import BreweryBrewsContainer from '../containers/BreweryBrewsContainer';

class BreweryMain extends Component {
  render() {
    return (
			<div id='breweryMain'>
				<Header />
				<BreweryDetailContainer />
				<BreweryBrewsContainer {...this.props}/>
			</div>
    );
  }
}

export default connect(null, null)(BreweryMain);
