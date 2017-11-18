import React from 'react';
import { Link } from 'react-router-dom';

const CurrentBrewsList = ({ id, brewery }) => {
	let brews = brewery.currentTapLineup.brews.map((brew, index) => {
		return (
			<li key={index}>
				<h2>{brew.name} - {brew.percentage}%</h2>
				<p>{brew.description}</p>
			</li>
		);
	});
	return (
		<div id={id}>
			<Link to={`/breweries/${brewery.code}`}>{brewery.name}</Link>
			<ul>
				{brews}
			</ul>
		</div>
	);
}

export default CurrentBrewsList;
