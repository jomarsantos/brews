import { combineReducers } from 'redux';
import CurrentBrewsReducer from './reducers_current_brews';
import UserReducer from './reducers_user';
import FavoritesReducer from './reducers_favorites';
import BreweryReducer from './reducers_brewery';

const rootReducer = combineReducers({
  currentBrews: CurrentBrewsReducer,
	user: UserReducer,
	favorites: FavoritesReducer,
	brewery: BreweryReducer
});

export default rootReducer;
