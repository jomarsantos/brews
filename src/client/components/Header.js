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
				<button>Login via Facebook</button>
			</LoginButton>
		);
		let user = null;
		if (this.props.user.id) {
			user = this.props.user.name;
			button = (
				<LogoutButton>
					<button>Logout</button>
				</LogoutButton>
			);
		}



		return(
			<div id='header'>
				<Link to='/'><h1>BREWING IN VANCOUVER</h1></Link>
				{ user }
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
