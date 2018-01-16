import { LOGIN, LOGOUT } from '../actions/auth';

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
	  default:
	    return state;
  }
}
