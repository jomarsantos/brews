import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/main.scss';

const Header = () => {
	return (
		<div id='header'>
			<Link to='/'><h1>BREWING IN VANCOUVER</h1></Link>
		</div>
	);
}

export default Header;
