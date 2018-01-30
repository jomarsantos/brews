import React, { Component } from 'react';
import { connect } from 'react-redux'

class BreweryDetailContainer extends Component {
	render() {
		let main = null;
		if (this.props.status === 'loading') {
			main = (
				<h1>Loading...</h1>
			);
		} else {
			main = (
				<div>
					<img id='breweryDetailContainer-image' src={this.props.details.logo}/>
					<br />
					<h1 id ='breweryDetailContainer-name'>{this.props.details.name}</h1>
				</div>
			);
		}

		return (
			<div id='breweryDetailContainer'>
				{main}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
		status: state.brewery.status,
    brews: state.brewery.brews,
		details: state.brewery.details
  };
}

export default connect(mapStateToProps, null)(BreweryDetailContainer);
