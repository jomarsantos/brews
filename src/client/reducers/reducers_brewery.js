import { RECEIVE_BREWERY, RESET_BREWERY, SET_FILTER } from '../actions/brewery';

const INITIAL_STATE = {
	status: 'loading',
	details: {},
	brews: [],
	filter: 'all'
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
		case RESET_BREWERY:
			return {
				...state,
				status: action.status,
				details: action.details,
				brews: action.brews,
				filter: action.filter
			};
		case SET_FILTER:
			return {
				...state,
				filter: action.filter
			};
	  default:
	    return state;
  }
}
