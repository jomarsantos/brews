import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReactGA from 'react-ga';
import Header from '../components/Header';
import BreweryDetailContainer from '../containers/BreweryDetailContainer';
import BreweryBrewsContainer from '../containers/BreweryBrewsContainer';

class BreweryMain extends Component {
	componentDidMount() {
		document.title = "Brewing";
		ReactGA.pageview(window.location.pathname);
	}

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
