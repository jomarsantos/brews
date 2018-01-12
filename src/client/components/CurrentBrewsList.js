import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/main.scss';
import util from '../util';

const CurrentBrewsList = ({ id, brewery }) => {
	let lastUpdated = util.formatDate(brewery.currentTapLineup.publishedDate);
	let brews = brewery.currentTapLineup.brews.map((brew, index) => {
		let percentage = '';
		if (brew.percentage !== -1) {
			percentage =  " - " + brew.percentage + "%";
		}

		return (
			<li key={index}>

				<h2 className='currentBrewsList-brewName'>{brew.name + percentage}</h2>
				<p className='currentBrewsList-brewSubtitle'>{brew.subtitle}</p>
			</li>
		);
	});

	function hasLessThanThreeBrews(numBrews) {
		return numBrews < 3;
	}

	return (
		<div className='currentBrewsList' id={id}>
			<div className='currentBrewsList-header'>
				<Link to={`/breweries/${brewery.code}`}><img className='currentBrewsList-breweryLogo' src={brewery.logo} /></Link>
				<div className='currentBrewsList-breweryDetails'>
					<Link to={`/breweries/${brewery.code}`}><h1 className='currentBrewsList-breweryName'>{brewery.name}</h1></Link>
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

export default CurrentBrewsList;
