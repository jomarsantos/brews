import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger'
import promise from 'redux-promise';
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers';


export default function configureStore(initialState) {
	const enhancers = compose(
		applyMiddleware(thunkMiddleware, promise, logger),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	);

	let persistedState = {};
	if (localStorage.getItem('user')) {
		persistedState = {
			user: JSON.parse(localStorage.getItem('user'))
		}
	}

  const store = createStore(rootReducer, persistedState, enhancers);

	store.subscribe(() => {
	  localStorage.setItem('user', JSON.stringify(store.getState().user));
	});

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
