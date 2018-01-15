import { combineReducers } from 'redux';
import CurrentBrewsReducer from './reducers_current_brews';
import UserReducer from './reducers_user';

const rootReducer = combineReducers({
  currentBrews: CurrentBrewsReducer,
	user: UserReducer
});

export default rootReducer;
