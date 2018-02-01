import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import style from '../styles/main.scss';
import util from '../util';
import { toggleFavorite } from '../actions/favorites';

class FavoriteBrewsList extends Component {
	render() {
		let loggedIn = false;
		let favorites = false;
		if (this.props.user.id) {
			loggedIn = true;
			favorites = this.props.user.favorites;
		}

		let brews = this.props.brewery.brews.map((brew, index) => {
			let percentage = '';
			if (brew.percentage !== -1) {
				percentage =  " - " + brew.percentage + "%";
			}

			let star = null;
			if (loggedIn) {
				if (favorites.indexOf(brew._id) !== -1) {
					star = <i id='star' className="fa fa-star" aria-hidden="true"
						onClick={() => this.props.toggleFavorite(this.props.user, brew._id)}></i>;
				} else {
					star = <i id='star' className="fa fa-star-o" aria-hidden="true"
						onClick={() => this.props.toggleFavorite(this.props.user, brew._id)}></i>;
				}
			}

			return (
				<li key={index}>
					<div className='genericBrewsList-brewText'>
						<h2 className='genericBrewsList-brewName'>{brew.name + percentage}</h2>
						<p className='genericBrewsList-brewSubtitle'>{brew.subtitle}</p>
					</div>
					{star}
				</li>
			);
		});

		return (
			<div className='genericBrewsList' id={this.props.id}>
				<div className='genericBrewsList-header'>
					<div className='genericBrewsList-breweryDetails'>
						<Link className='genericBrewsList-breweryLogoLink' to={`/breweries/${this.props.brewery.code}`}><img className='genericBrewsList-breweryLogo' src={this.props.brewery.logo} /></Link>
						<div className='genericBrewsList-breweryText'>
							<Link to={`/breweries/${this.props.brewery.code}`}><h1 className='genericBrewsList-breweryName'>{this.props.brewery.name}</h1></Link>
						</div>
					</div>
				</div>
				<div className='genericBrewsList-brews'>
					<ul>
						{brews}
					</ul>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleFavorite: (user, brewId) => {
      dispatch(toggleFavorite(user, brewId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteBrewsList);
