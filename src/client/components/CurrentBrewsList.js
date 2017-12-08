import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/main.scss';
import util from '../util';

const CurrentBrewsList = ({ id, brewery }) => {
	let lastUpdated = util.formatDate(brewery.currentTapLineup.publishedDate);
	let brews = brewery.currentTapLineup.brews.map((brew, index) => {
		return (
			<li key={index}>
				<h2>{brew.name} - {brew.percentage}%</h2>
				<p className='brewSubtitle'>{brew.subtitle}</p>
			</li>
		);
	});
	return (
		<div id={id}>
			<img src={brewery.logo} />
			<h1><Link to={`/breweries/${brewery.code}`}>{brewery.name}</Link></h1>
			<p>Last Updated: {lastUpdated}</p>
			<ul>
				{brews}
			</ul>
		</div>
	);
}

export default CurrentBrewsList;
