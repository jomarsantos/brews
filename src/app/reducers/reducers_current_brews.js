import { RECEIVE_CURRENT_BREWS } from '../actions/currentBrews';

const INITIAL_STATE = {
	status: 'loading',
	brews: [],
	receivedAt: ''
};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
	  case RECEIVE_CURRENT_BREWS:
	  	return {
				...state,
				status: action.status,
				brews: action.brews,
				receivedAt: action.receivedAt
			};
	  default:
	    return state;
  }
}
