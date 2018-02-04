import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchBrewery, resetBrewery, setFilter } from '../actions/brewery';
import BreweryBrewsList from '../components/BreweryBrewsList';


class BreweryBrewsContainer extends Component {
	componentDidMount() {
		this.props.fetchBrewery(this.props.breweryCode);
	}

	componentWillUnmount() {
		this.props.resetBrewery();
	}

	render() {
		const isLoading = this.props.status == 'loading';

		let main = null;
		if (this.props.brews.length == 0) {
			main = <p>Brewery has not produced any brews before.</p>
		} else {
			let brews = [];
			if (this.props.filter === 'current') {
				this.props.brews.forEach((brew, index) => {
					if (this.props.details.currentTapLineup.brews.includes(brew._id)) {
						brews.push(brew);
					}
				});

			} else {
				brews = this.props.brews;
			}

			main = <BreweryBrewsList brews={brews} brewery={this.props.details} publishedDate={this.props.details.currentTapLineup.publishedDate}/>;
		}

		return(
			<div id='breweryBrewsContainer'>
				<div id='breweryBrewsContainer-filters'>
					<button className={"breweryBrewsContainer-filterButton"
						+ (this.props.filter === 'current' ? ' chosenFilter' : '')}
						id="breweryBrewsContainer-currentBrewsButton"
						onClick={() => this.props.setFilter('current')}>
						CURRENTLY BREWING
					</button>
					<button className={"breweryBrewsContainer-filterButton"
						+ (this.props.filter === 'all' ? ' chosenFilter' : '')}
						id="breweryBrewsContainer-allBrewsButton"
						onClick={() => this.props.setFilter('all')}>
						ALL BREWS EVER MADE
					</button>
				</div>
				{ main }
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
    status: state.brewery.status,
		brews: state.brewery.brews,
		details: state.brewery.details,
		filter: state.brewery.filter,
		breweryCode: ownProps.match.params.breweryCode,
		user: state.user,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBrewery: (breweryCode) => {
      dispatch(fetchBrewery(breweryCode));
    },
		resetBrewery: () => {
      dispatch(resetBrewery());
    },
		setFilter: (filter) => {
			dispatch(setFilter(filter));
		}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BreweryBrewsContainer);
