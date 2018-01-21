// List of populators

var thirtyThreeAcres = require('./breweryPopulators/33acres');
var brassneck = require('./breweryPopulators/brassneck');
var strangefellows = require('./breweryPopulators/strangefellows');
var steelandoak = require('./breweryPopulators/steelandoak');
var parallel49 = require('./breweryPopulators/parallel49');
var dogwood = require('./breweryPopulators/dogwood');
var redtruck = require('./breweryPopulators/redtruck');
var callister = require('./breweryPopulators/callister');
var strathcona = require('./breweryPopulators/strathcona');

function combineBreweryPopulators() {
	// Property must match up with code of brewery
	var populators = {
		brassneck: brassneck,
		strangefellows: strangefellows,
		steelandoak: steelandoak,
		parallel49: parallel49,
		dogwood: dogwood,
		redtruck: redtruck,
		callister: callister,
		strathcona: strathcona
	}

	// To handle codes that start with a number
	populators['33acres'] = thirtyThreeAcres;

	return populators;
}

module.exports = combineBreweryPopulators();
