import React, { Component } from 'react';
import { connect } from 'react-redux'
import BreweryContainer from '../containers/BreweryContainer';

class BreweryMain extends Component {
  render() {
    return (
			<div id='breweryMain'>
				<BreweryContainer {...this.props}/>
			</div>
    );
  }
}

export default connect(null, null)(BreweryMain);
