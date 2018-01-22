import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import style from '../styles/main.scss';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';

class Header extends Component {
	render() {
		let button = (
			<LoginButton>
				<div id='header-loginButton'>
					<p>Log In</p>
					<i className="fa fa-facebook-square" aria-hidden="true"></i>
				</div>
			</LoginButton>
		);
		let user = null;
		if (this.props.user.id) {
			user = this.props.user.name;
			button = (
				<div id='header-loggedIn'>
					<Link to='/user'>
						<div id='header-userName'>
							<p>{user}</p>
						</div>
					</Link>
					<LogoutButton id='header-logoutButtonContainer'>
						<div id='header-logoutButton'>
							<i className="fa fa-sign-out" aria-hidden="true"></i>
						</div>
					</LogoutButton>
				</div>
			);
		}



		return(
			<div id='header'>
				<Link to='/'><h1>BREWING IN VANCOUVER</h1></Link>
				{ button }
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
