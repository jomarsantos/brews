import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchCurrentBrews } from '../actions/currentBrews';
import CurrentBrewsList from '../components/CurrentBrewsList';


class CurrentBrewsContainer extends Component {
	componentDidMount() {
		this.props.fetchCurrentBrews();
	}

	render() {
		const isLoading = this.props.status == 'loading';

		let main = null;
    if (isLoading) {
      main = <p>Loading</p>;
    } else {
      main = this.props.brews.map((brewery, index) => {
				return (
					<CurrentBrewsList id={'brewery'+index} key={brewery._id} brewery={brewery} />
				);
			})
    }

		return(
			<div id='currentBrewsContainer'>
				{ main }
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    status: state.currentBrews.loading,
		brews: state.currentBrews.brews,
		receivedAt: state.currentBrews.receivedAt
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentBrews: () => {
      dispatch(fetchCurrentBrews());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBrewsContainer);
