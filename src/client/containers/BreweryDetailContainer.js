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
			let links = [];
			if (this.props.details.hasOwnProperty('website')) {
				links.push(
					<a class='breweryDetailContainer-link' id='breweryDetail_website' href={this.props.details.website} target="_blank">
						<i className="breweryDetailContainer-linkIcon fa fa-globe" aria-hidden="true"></i>
					</a>
				);
			}
			if (this.props.details.hasOwnProperty('facebook')) {
				links.push(
					<a class='breweryDetailContainer-link' id='breweryDetail_facebook' href={this.props.details.facebook} target="_blank">
						<i className="breweryDetailContainer-linkIcon fa fa-facebook-square" aria-hidden="true"></i>
					</a>
				);
			}
			if (this.props.details.hasOwnProperty('instagram')) {
				links.push(
					<a class='breweryDetailContainer-link' id='breweryDetail_instagram' href={'https://www.instagram.com/'+this.props.details.instagram} target="_blank">
						<i className="breweryDetailContainer-linkIcon fa fa-instagram" aria-hidden="true"></i>
					</a>
				);
			}
			if (this.props.details.hasOwnProperty('twitter')) {
				links.push(
					<a class='breweryDetailContainer-link' id='breweryDetail_twitter' href={'https://twitter.com/'+this.props.details.twitter} target="_blank">
						<i className="breweryDetailContainer-linkIcon fa fa-twitter-square" aria-hidden="true"></i>
					</a>
				);
			}
			if (this.props.details.hasOwnProperty('youtube')) {
				links.push(
					<a class='breweryDetailContainer-link' id='breweryDetail_youtube' href={this.props.details.youtube} target="_blank">
						<i className="breweryDetailContainer-linkIcon fa fa-youtube-square" aria-hidden="true"></i>
					</a>
				);
			}
			if (links.length === 0) {
				links = null;
			}

			let address = '';
			if (this.props.details.hasOwnProperty('address')) {
				address += this.props.details.address;
			}
			if (this.props.details.hasOwnProperty('city')) {
				if (address) {
					address += ", ";
				}
				address += this.props.details.city;
			}


			main = (
				<div>
					<img id='breweryDetailContainer-image' src={this.props.details.logo}/>
					<br />
					<div>
						<h1 id='breweryDetailContainer-name'>{this.props.details.name}</h1>
						<h2 id='breweryDetailContainer-address'>{address}</h2>
					{links}
					</div>
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
