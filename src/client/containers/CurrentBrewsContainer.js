import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchCurrentBrews } from '../actions/currentBrews';
import CurrentBrewsList from '../components/CurrentBrewsList';


class CurrentBrewsContainer extends Component {
	componentDidMount() {
		if (this.props.brews.length === 0) {
			this.props.fetchCurrentBrews();
		}
	}

	render() {
		const isLoading = this.props.status == 'loading';

		let main = null;
    if (isLoading) {
      main = <p>Loading</p>;
    } else {
			let brews = [];
			if (this.props.filteredBrews === -1) {
				main = <div className='noResults'><p>No matches. Please try another search.</p></div>;
			} else {
				if (this.props.filteredBrews.length != 0) {
					brews = this.props.filteredBrews;
				} else {
					brews = this.props.brews;
				}
				brews = brews.filter((brewery) => {
					return brewery.hasOwnProperty('currentTapLineup');
				});

				// Order breweries from most brews to least
				function numBrewsCompare(a, b) {
				  if (a.currentTapLineup.brews.length > b.currentTapLineup.brews.length) {
						return -1;
					} else {
						return 1;
					}
				}
				brews.sort(numBrewsCompare);

				// Distribute breweries over 3 columns
				let columns = [[],[],[]];
				let numBrews = [0, 0, 0];
				brews.forEach((brewery, index) => {
					let column = 0;
					if (numBrews[1] < numBrews[column]) {
						column = 1;
					}
					if (numBrews[2] < numBrews[column]) {
						column = 2;
					}

					columns[column].push(brewery);
					numBrews[column] += brewery.currentTapLineup.brews.length;
				})

				// Add brewery lineups to columns
				columns.forEach((column, index) => {
					columns[index] = column.map((brewery, index) => {
						return (
							<CurrentBrewsList id={'brewery'+index} key={brewery._id} brewery={brewery}/>
						);
					});
				})

				// Remove unused columns
				columns.forEach((column, index) => {
					if (column.length === 0) {
						columns.splice(index);
					}
				})

				// Create columns
				let columnElements = columns.map((column, index) => {
					return (
						<div className='genericBrewsContainer-column' key={index}>
							{ column }
						</div>
					);
				});

				main = (
					<div id='genericBrewsContainer-columns'>
						{ columnElements }
					</div>
				);
			}
    }

		return(
			<div id='genericBrewsContainer'>
				{ main }
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    status: state.currentBrews.status,
		brews: state.currentBrews.brews,
		filteredBrews: state.currentBrews.filteredBrews,
		receivedAt: state.currentBrews.receivedAt,
		user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentBrews: () => {
      dispatch(fetchCurrentBrews());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBrewsContainer);
