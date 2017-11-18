import { combineReducers } from 'redux';
import CurrentBrewsReducer from './reducers_current_brews';

const rootReducer = combineReducers({
  currentBrews: CurrentBrewsReducer
});

export default rootReducer;
