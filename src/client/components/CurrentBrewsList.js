import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import style from '../styles/main.scss';
import util from '../util';
import { toggleFavorite } from '../actions/favorites';

class CurrentBrewsList extends Component {
	render() {
		let loggedIn = false;
		let favorites = false;
		if (this.props.user.id) {
			loggedIn = true;
			favorites = this.props.user.favorites;
		}

		let lastUpdated = util.formatDate(this.props.brewery.currentTapLineup.publishedDate);
		let brews = this.props.brewery.currentTapLineup.brews.map((brew, index) => {
			let percentage = '';
			if (brew.percentage !== -1) {
				percentage =  " - " + brew.percentage + "%";
			}

			let star = null;
			if (loggedIn) {
				if (favorites.indexOf(brew._id) !== -1) {
					star = <i className="fa fa-star" aria-hidden="true"
						onClick={() => this.props.toggleFavorite(this.props.user, brew._id)}></i>;
				} else {
					star = <i className="fa fa-star-o" aria-hidden="true"
						onClick={() => this.props.toggleFavorite(this.props.user, brew._id)}></i>;
				}
			}

			return (
				<li key={index}>

					<h2 className='currentBrewsList-brewName'>{brew.name + percentage}</h2>
					<p className='currentBrewsList-brewSubtitle'>{brew.subtitle}</p>
					{star}
				</li>
			);
		});

		return (
			<div className='currentBrewsList' id={this.props.id}>
				<div className='currentBrewsList-header'>
					<Link to={`/breweries/${this.props.brewery.code}`}><img className='currentBrewsList-breweryLogo' src={this.props.brewery.logo} /></Link>
					<div className='currentBrewsList-breweryDetails'>
						<Link to={`/breweries/${this.props.brewery.code}`}><h1 className='currentBrewsList-breweryName'>{this.props.brewery.name}</h1></Link>
						<p className='currentBrewsList-lastUpdated'>Updated: {lastUpdated}</p>
					</div>
				</div>
				<div className='currentBrewsList-brews'>
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

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBrewsList);
