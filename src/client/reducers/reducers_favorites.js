import { RECEIVE_USER_FAVORITES } from '../actions/favorites';

const INITIAL_STATE = {
	status: 'loading',
	favorites: []
};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
	  case RECEIVE_USER_FAVORITES:
	  	return {
				...state,
				status: action.status,
				favorites: action.favorites
			};
	  default:
	    return state;
  }
}
