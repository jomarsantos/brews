import React from 'react';

const TestComponent = ({ id, brewery }) => {
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
			<h1>
				{brewery.name}
			</h1>
			<ul>
				{brews}
			</ul>
		</div>
	);
}

export default TestComponent;
