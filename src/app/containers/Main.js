import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchCurrentBrews } from '../actions/currentBrews';

class Main extends Component {
	componentDidMount() {
		this.props.fetchCurrentBrews();
	}

	render() {
		var view = '';
		if (this.props.status == 'loading') {
			return(
				<div>
					<h1>loading</h1>
				</div>
			);
		} else {
			return(
				<div>
					<h1>{ this.props.receivedAt }</h1>
					{
						this.props.brews.map((brewery, index) => {
					    return (
					        <p key={brewery._id}>
					            {brewery.name}
					        </p>
				    	);
						})
					}
				</div>
			);
		}
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
