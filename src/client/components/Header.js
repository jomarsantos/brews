import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import style from '../styles/main.scss';
import LoginButton from '../components/LoginButton';

class Header extends Component {
	render() {
		let buttonText = 'Login via Facebook';
		if (this.props.user.name) {
			buttonText = this.props.user.name;
		}

		return(
			<div id='header'>
				<Link to='/'><h1>BREWING IN VANCOUVER</h1></Link>
				<LoginButton>
					<button>{buttonText}</button>
				</LoginButton>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, null)(Header);
