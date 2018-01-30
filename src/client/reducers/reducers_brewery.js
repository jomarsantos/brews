import { RECEIVE_BREWERY } from '../actions/brewery';

const INITIAL_STATE = {
	status: 'loading',
	details: {},
	brews: []
};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
	  case RECEIVE_BREWERY:
	  	return {
				...state,
				status: action.status,
				details: action.details,
				brews: action.brews
			};
	  default:
	    return state;
  }
}
