import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchBrewery, resetBrewery } from '../actions/brewery';
import CurrentBrewsList from '../components/CurrentBrewsList';


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
    // if (isLoading) {
    //   main = <p>Loading</p>;
    // } else {
		// 	let brews = [];
		// 	if (this.props.filteredBrews === -1) {
		// 		main = <div className='noResults'><p>No matches. Please try another search.</p></div>;
		// 	} else {
		// 		if (this.props.filteredBrews.length != 0) {
		// 			brews = this.props.filteredBrews;
		// 		} else {
		// 			brews = this.props.brews;
		// 		}
		// 		brews = brews.filter((brewery) => {
		// 			return brewery.hasOwnProperty('currentTapLineup');
		// 		});
		//
		// 		// Order breweries from most brews to least
		// 		function numBrewsCompare(a, b) {
		// 		  if (a.currentTapLineup.brews.length > b.currentTapLineup.brews.length) {
		// 				return -1;
		// 			} else {
		// 				return 1;
		// 			}
		// 		}
		// 		brews.sort(numBrewsCompare);
		//
		// 		// Distribute breweries over 3 columns
		// 		let columns = [[],[],[]];
		// 		let numBrews = [0, 0, 0];
		// 		brews.forEach((brewery, index) => {
		// 			let column = 0;
		// 			if (numBrews[1] < numBrews[column]) {
		// 				column = 1;
		// 			}
		// 			if (numBrews[2] < numBrews[column]) {
		// 				column = 2;
		// 			}
		//
		// 			columns[column].push(brewery);
		// 			numBrews[column] += brewery.currentTapLineup.brews.length;
		// 		})
		//
		// 		// Add brewery lineups to columns
		// 		columns.forEach((column, index) => {
		// 			columns[index] = column.map((brewery, index) => {
		// 				return (
		// 					<CurrentBrewsList id={'brewery'+index} key={brewery._id} brewery={brewery}/>
		// 				);
		// 			});
		// 		})
		//
		// 		// Create columns
		// 		let columnElements = columns.map((column, index) => {
		// 			return (
		// 				<div className='currentBrewsContainer-column' key={index}>
		// 					{ column }
		// 				</div>
		// 			);
		// 		});
		//
		// 		main = (
		// 			<div id='currentBrewsContainer-columns'>
		// 				{ columnElements }
		// 			</div>
		// 		);
		// 	}
    // }

		return(
			<div id='currentBrewsContainer'>
				{ main }
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
    status: state.brewery.status,
		brewery: state.brewery.brewery,
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BreweryBrewsContainer);
