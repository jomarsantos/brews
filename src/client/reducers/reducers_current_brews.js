import { RECEIVE_CURRENT_BREWS, UPDATE_FILTERED_BREWS, CLEAR_FILTERED_BREWS, SET_FAVORITES_ONLY_FILTER } from '../actions/currentBrews';

const INITIAL_STATE = {
	status: 'loading',
	brews: [],
	filteredBrews: [],
	receivedAt: '',
	favoritesOnly: false
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
		case UPDATE_FILTERED_BREWS:
	  	return {
				...state,
				filteredBrews: action.filteredBrews,
				favoritesOnly: action.favoritesOnly
			};
		case CLEAR_FILTERED_BREWS:
			return {
				...state,
				filteredBrews: action.filteredBrews,
				favoritesOnly: action.favoritesOnly
			};
		case SET_FAVORITES_ONLY_FILTER:
			return {
				...state,
				favoritesOnly: action.favoritesOnly
			};
	  default:
	    return state;
  }
}
