import React, { Component } from 'react';
import { connect } from 'react-redux'
import Header from '../components/Header';
import CurrentBrewsFilter from '../containers/CurrentBrewsFilter';
import CurrentBrewsContainer from '../containers/CurrentBrewsContainer';

class CurrentBrewsMain extends Component {
	componentDidMount() {
    document.title = "Brews | Currently Brewing";
  }

  render() {
    return (
			<div id='currentBrewsMain'>
				<Header />
				<CurrentBrewsFilter />
				<CurrentBrewsContainer />
			</div>
    );
  }
}

export default connect(null, null)(CurrentBrewsMain);
