import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReactGA from 'react-ga';
import Header from '../components/Header';
import CurrentBrewsFilter from '../containers/CurrentBrewsFilter';
import CurrentBrewsContainer from '../containers/CurrentBrewsContainer';

class CurrentBrewsMain extends Component {
	componentDidMount() {
    document.title = "Brewing | Currently Brewing";
		ReactGA.pageview(window.location.pathname);
  }

  render() {
    return (
			<div id='currentBrewsMain'>
				<Header />
				<h1 id='pageTitle'>CURRENTLY BREWING</h1>
				<CurrentBrewsFilter />
				<CurrentBrewsContainer />
			</div>
    );
  }
}

export default connect(null, null)(CurrentBrewsMain);
