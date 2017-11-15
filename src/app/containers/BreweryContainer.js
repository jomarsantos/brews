import React, { Component } from 'react';
import { connect } from 'react-redux'

class BreweryContainer extends Component {
	render() {
		return(
			<div id='breweryContainer'>
				{ this.props.breweryCode }
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
    breweryCode: ownProps.match.params.breweryCode
  };
}

export default connect(mapStateToProps, null)(BreweryContainer);
