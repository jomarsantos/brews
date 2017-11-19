var config = require('../config');
var Brew = require('../models/Brew');
var BrewCategory = require('../models/BrewCategory');
var Brewery = require('../models/Brewery');
var Lineup = require('../models/Lineup');

console.log('* DROPPING ALL COLLECTIONS *');

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

// Clear
console.log('Dropping Brewery collection');
Brewery.collection.drop(function(err) {
	if (err) {
		console.log('ERROR: ' + err.message);
	} else {
		console.log('Dropped');
	}
	console.log('Dropping BrewCategory collection');
	BrewCategory.collection.drop(function(err) {
		if (err) {
			console.log('ERROR: ' + err.message);
		} else {
			console.log('Dropped');
		}
		console.log('Dropping Brew collection');
		Brew.collection.drop(function(err) {
			if (err) {
				console.log('ERROR: ' + err.message);
			} else {
				console.log('Dropped');
			}
			console.log('Dropping Lineup collection');
			Lineup.collection.drop(function(err) {
				if (err) {
					console.log('ERROR: ' + err.message);
				} else {
					console.log('Dropped');
				}
				console.log('Closing database connection');
				mongoose.connection.close();
			});
		});
	});
});
