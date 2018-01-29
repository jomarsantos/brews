import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchUserFavorites } from '../actions/favorites';
import FavoriteBrewsList from '../components/FavoriteBrewsList';

class UserFavoritesContainer extends Component {
	componentDidMount() {
		if (this.props.favorites.length === 0) {
			this.props.fetchUserFavorites(this.props.user);
		}
	}

	render() {
		const isLoading = this.props.status == 'loading';

		let main = null;
    if (isLoading) {
      main = <p>Loading</p>;
    } else {
			let brews = this.props.favorites;

			// Order breweries from most brews to least
			function numBrewsCompare(a, b) {
				if (a.brews.length > b.brews.length) {
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
				numBrews[column] += brewery.brews.length;
			})

			// Add brewery lineups to columns
			columns.forEach((column, index) => {
				columns[index] = column.map((brewery, index) => {
					return (
						<FavoriteBrewsList id={'brewery'+index} key={brewery._id} brewery={brewery}/>
					);
				});
			})

			// Create columns
			let columnElements = columns.map((column, index) => {
				return (
					<div className='currentBrewsContainer-column' key={index}>
						{ column }
					</div>
				);
			});

			main = (
				<div id='currentBrewsContainer-columns'>
					{ columnElements }
				</div>
			);
		}

		return(
			<div id='currentBrewsContainer'>
				{ main }
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
		status: state.favorites.status,
		favorites: state.favorites.favorites,
		user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserFavorites: (user) => {
      dispatch(fetchUserFavorites(user));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFavoritesContainer);