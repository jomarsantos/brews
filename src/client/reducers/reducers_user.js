import { LOGIN, LOGOUT } from '../actions/auth';
import { UPDATE_USER_FAVORITES } from '../actions/favorites';

const INITIAL_STATE = {
	user: {}
};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
	  case LOGIN:
	  	return action.user;
		case LOGOUT:
			return action.user;
		case UPDATE_USER_FAVORITES:
			return {
				...state,
				favorites: action.favorites
			};
	  default:
	    return state;
  }
}
