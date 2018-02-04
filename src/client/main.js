import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux';

import configureStore from './store/configureStore.js';
import CurrentBrewsMain from './pages/CurrentBrewsMain';
import BreweryMain from './pages/BreweryMain';
import UserMain from './pages/UserMain';

const store = configureStore();

document.addEventListener('DOMContentLoaded', function() {
	ReactGA.initialize('UA-113561333-1');
	ReactDOM.render(
		<Provider store={store}>
	    <Router>
				<Switch>
					<Route exact path="/" component={CurrentBrewsMain} />
					<Route path="/breweries/:breweryCode" component={BreweryMain} />
					<Route path="/user" component={UserMain} />
					// TODO: provide a 'pretty' 404 page
					<Route render={() => <h1>Page not found</h1>} />
				</Switch>
	    </Router>
	  </Provider>,
	  document.getElementById('root')
	);
});
