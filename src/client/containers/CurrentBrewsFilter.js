import React, { Component } from 'react';
import { connect } from 'react-redux'
import { filterCurrentBrews, clearFilteredBrews, favoritesOnlyToggle } from '../actions/currentBrews';

class CurrentBrewsFilter extends Component {
	constructor(props) {
    super(props);

    this.state = {
      breweryInput: '',
			brewInput: ''
    };
  }

	handleBreweryChange(event) {
	  this.setState({breweryInput: event.target.value}, () => this.filter());
	}

	handleBrewChange(event) {
	  this.setState({brewInput: event.target.value}, () => this.filter());
	}

	filter(favoritesOnly) {
		let breweryInput = this.state.breweryInput.trim().toLowerCase();
		let brewInput = this.state.brewInput.trim().toLowerCase();

		this.props.filterCurrentBrews(breweryInput, brewInput, favoritesOnly);
	}

	clear(event) {
		this.setState({
			breweryInput: '',
			brewInput: ''
		});

		if (this.props.filteredBrews.length == 0) {
			return
		}

		this.props.clearFilteredBrews();
	}

	render() {
		let favoritesOnlyButton = null;
		if (this.props.user.id) {
			let star = (
				<i id='star' className="fa fa-star-o" aria-hidden="true"></i>
			);
			if (this.props.favoritesOnly) {
				star = (
					<i id='star' className="fa fa-star" aria-hidden="true"></i>
				);
			}
			favoritesOnlyButton = (
				<button type="button" onClick={() => this.filter(!this.props.favoritesOnly)}>{star}</button>
			);
		}


		return(
			<div id='currentBrewsFilter'>
				{favoritesOnlyButton}
				<input type="text" placeholder="BREWERY" name="title" value={this.state.breweryInput} onChange={this.handleBreweryChange.bind(this)}/>
				<input type="text" placeholder="BREW" name="title" value={this.state.brewInput} onChange={this.handleBrewChange.bind(this)}/>
				<button type="button" onClick={this.clear.bind(this)} className="">&#10005;</button>
			</div>
		);
	}

	componentWillUnmount() {
		this.clear();
	}
}

const mapStateToProps = (state) => {
  return {
		filteredBrews: state.currentBrews.filteredBrews,
		favoritesOnly: state.currentBrews.favoritesOnly,
		user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterCurrentBrews: (breweryInput, brewInput, favoritesOnly) => {
      dispatch(filterCurrentBrews(breweryInput, brewInput, favoritesOnly));
    },
		clearFilteredBrews: () => {
			dispatch(clearFilteredBrews());
		},
		favoritesOnlyToggle: (setting) => {
      dispatch(favoritesOnlyToggle(setting));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBrewsFilter);
