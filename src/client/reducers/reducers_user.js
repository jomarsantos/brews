import { LOGIN } from '../actions/login';

const INITIAL_STATE = {
	user: {}
};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
	  case LOGIN:
	  	return action.user;
	  default:
	    return state;
  }
}
