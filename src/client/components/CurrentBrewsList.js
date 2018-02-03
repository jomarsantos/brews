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
				<Link to={`/breweries/${this.props.brewery.code}`}>
					<div className='genericBrewsList-header'>
						<div className='genericBrewsList-breweryDetails'>
							<div className='genericBrewsList-breweryText'>
								<h1 className='genericBrewsList-breweryName'>{this.props.brewery.name}</h1>
								<p className='genericBrewsList-lastUpdated'>UPDATED: {lastUpdated}</p>
							</div>
						</div>
					</div>
				</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBrewsList);
