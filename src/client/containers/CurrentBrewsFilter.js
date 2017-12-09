import React, { Component } from 'react';
import { connect } from 'react-redux'
import { filterCurrentBrews, clearFilteredBrews} from '../actions/currentBrews';

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

	filter() {
		let breweryInput = this.state.breweryInput.trim().toLowerCase();
		let brewInput = this.state.brewInput.trim().toLowerCase();
		if (!breweryInput && !brewInput) {
			return;
		}

		this.props.filterCurrentBrews(breweryInput, brewInput);
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
		return(
			<div id='currentBrewsFilter'>
				<input type="text" placeholder="Brewery" name="title" value={this.state.breweryInput} onChange={this.handleBreweryChange.bind(this)}/>
				<input type="text" placeholder="Brew" name="title" value={this.state.brewInput} onChange={this.handleBrewChange.bind(this)}/>
				<button type="button" onClick={this.clear.bind(this)} className="">Clear</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
		filteredBrews: state.currentBrews.filteredBrews,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterCurrentBrews: (breweryInput, brewInput) => {
      dispatch(filterCurrentBrews(breweryInput, brewInput));
    },
		clearFilteredBrews: () => {
			dispatch(clearFilteredBrews());
		}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBrewsFilter);
