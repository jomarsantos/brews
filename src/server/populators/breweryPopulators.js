// List of populators

var thirtyThreeAcres = require('./breweryPopulators/33acres');
var brassneck = require('./breweryPopulators/brassneck');
var strangefellows = require('./breweryPopulators/strangefellows');
var steelandoak = require('./breweryPopulators/steelandoak');
var parallel49 = require('./breweryPopulators/parallel49');
var bomber = require('./breweryPopulators/bomber');

function combineBreweryPopulators() {
	// Property must match up with code of brewery
	var populators = {
		brassneck: brassneck,
		strangefellows: strangefellows,
		steelandoak: steelandoak,
		parallel49: parallel49,
		// bomber: bomber
	}

	// To handle codes that start with a number
	populators['33acres'] = thirtyThreeAcres;

	return populators;
}

module.exports = combineBreweryPopulators();
