var config = require('../config');
var Brewery = require('../models/Brewery');
var populators = require('./populators');
var async = require('async');

console.log('* UPDATING LINEUPS *');

// Database Setup
console.log('Connecting to database: ' + config.mongoURL);
var mongoose = require('mongoose');
var mongoDB = config.mongoURL;
mongoose.connect(mongoDB, {
	useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var updateFunctions = [];
var updateLineupResults = [];

function updateLineups(cb) {
  async.parallel(updateFunctions,
	function (err, results) {
		// Results is an array of update completion status (ie. error/success)
		updateLineupResults = results;
		cb();
	});
}

function initialize(cb) {
	Brewery.find({importActivated: 1}).select({code: 1}).exec().then(
		function(breweries) {
			if (breweries.length > 0) {
				breweries.forEach(function (brewery) {
					if (populators.hasOwnProperty(brewery.code)) {
						updateFunctions.push(
							function(callback) {
								populators[brewery.code].execute(callback);
							}
						);
					} else {
						console.log('ERROR: No populator found for brewery with code "' + brewery.code + '"');
					}
				});
				cb();
			} else {
				console.log('ERROR: No breweries found in database');
				cb(breweries, null);
			}
		}
	);
}

//////////////////////
// Main
//////////////////////

async.series([
		initialize,
	  updateLineups,
		// saveUpdateResultsToDatabase,
		// emailResults
	],
	// Callback
	function(err, results) {
    if (err) {
      console.log('ERROR: Update did not successfully complete');
    } else {
			console.log('Successfully updated lineups');
		}
		console.log('Closing database connection');
    mongoose.connection.close();
	}
);
