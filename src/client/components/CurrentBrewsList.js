import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/main.scss';
import util from '../util';

const CurrentBrewsList = ({ id, brewery }) => {
	let lastUpdated = util.formatDate(brewery.currentTapLineup.publishedDate);
	let brews = brewery.currentTapLineup.brews.map((brew, index) => {
		return (
			<li key={index}>
				<h2 className='brewName'>{brew.name} - {brew.percentage}%</h2>
				<p className='brewSubtitle'>{brew.subtitle}</p>
			</li>
		);
	});
	return (
		<div className='currentBrewsList' id={id}>
			<div className='header'>
				<Link to={`/breweries/${brewery.code}`}><img className='breweryLogo' src={brewery.logo} /></Link>
				<div className='breweryDetails'>
					<Link to={`/breweries/${brewery.code}`}><h1 className='breweryName'>{brewery.name}</h1></Link>
					<p className='lastUpdated'>LAST UPDATED: {lastUpdated}</p>
				</div>
			</div>
			<div className='brews'>
				<ul>
					{brews}
				</ul>
			</div>
		</div>
	);
}

export default CurrentBrewsList;
