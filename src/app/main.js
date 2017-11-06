import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux';

import configureStore from './store/configureStore.js';
import App from './pages/App';

const store = configureStore();

document.addEventListener('DOMContentLoaded', function() {
	ReactDOM.render(
		<Provider store={store}>
	    <Router>
	      <Route path="/" component={App} />
	    </Router>
	  </Provider>,
	  document.getElementById('root')
	);
});
