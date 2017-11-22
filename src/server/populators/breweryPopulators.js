// List of populators

var thirtyThreeAcres = require('./breweryPopulators/33acres');
var brassneck = require('./breweryPopulators/brassneck');

function combineBreweryPopulators() {
	// Property must match up with code of brewery
	var populators = {
		brassneck: brassneck,
	}

	// To handle codes that start with a number
	populators['33acres'] = thirtyThreeAcres;

	return populators;
}

module.exports = combineBreweryPopulators();
