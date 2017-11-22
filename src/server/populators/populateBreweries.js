var config = require('../config');
var breweries = require('./breweryIndex');
var Brewery = require('../models/Brewery');
var async = require('async');

console.log('* POPULATING BREWERIES *');

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

var createFunctions = [];

//////////////////////
// Breweries
//////////////////////

function createBrewery(code, name, description, address, city, province, country, postal, website, twitter, instagram, facebook, youtube, currentTapLineup, currentTakeoutLineup, importActivated, cb) {
	Brewery.find({code: code}).exec().then(
		function(res) {
			if (res.length > 0) {
				console.log('Brewery with code "' + code + '" already exists');
				cb(null, null)
			} else {
				var breweryDetail = {
					code: code,
					name: name,
					importActivated: importActivated
				};
				if (description != false) breweryDetail.description = description;
				if (address != false) breweryDetail.address = address;
				if (city != false) breweryDetail.city = city;
				if (province != false) breweryDetail.province = province;
				if (country != false) breweryDetail.country = country;
				if (postal != false) breweryDetail.postal = postal;
				if (website != false) breweryDetail.website = website;
				if (twitter != false) breweryDetail.twitter = twitter;
				if (instagram != false) breweryDetail.instagram = instagram;
				if (facebook != false) breweryDetail.facebook = facebook;
				if (youtube != false) breweryDetail.youtube = youtube;
				if (currentTapLineup != false) breweryDetail.currentTapLineup = currentTapLineup;
				if (currentTakeoutLineup != false) breweryDetail.currentTakeoutLineup = currentTakeoutLineup;

				var brewery = new Brewery(breweryDetail);

				brewery.save(function (err) {
				  if (err) {
						console.log('ERROR: ' + err.message);
				    cb(err, null)
				    return
				  }

					console.log('Added ' + name + ' to database');
				  cb(null, brewery)
				});
			}
		}
	);
}

function createBreweries(cb) {
  async.parallel(createFunctions, cb);
}

function initialize(cb) {
	breweries.forEach(function (brewery) {
		createFunctions.push(
			function(callback) {
	      createBrewery(
					brewery.code,
					brewery.name,
					brewery.description,
					brewery.address,
					brewery.city,
					brewery.province,
					brewery.country,
					brewery.postal,
					brewery.website,
					brewery.twitter,
					brewery.instagram,
					brewery.facebook,
					brewery.youtube,
					brewery.currentTapLineup,
					brewery.currentTakeoutLineup,
					brewery.importActivated,
					callback
				);
	    }
		)
	});
	cb();
}

//////////////////////
// Main
//////////////////////

async.series([
		initialize,
	  createBreweries
	],
	// Callback
	function(err, results) {
    if (err) {
      console.log('ERROR: Population did not successfully complete');
    } else {
			console.log('Successfully populated database');
		}
		console.log('Closing database connection');
    mongoose.connection.close();
	}
);
