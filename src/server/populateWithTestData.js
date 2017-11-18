var config = require('./config');
var Brew = require('./models/Brew');
var BrewCategory = require('./models/BrewCategory');
var Brewery = require('./models/Brewery');
var Lineup = require('./models/Lineup');
var async = require('async');

// Database Setup
var mongoose = require('mongoose');
var mongoDB = config.mongoURL;
mongoose.connect(mongoDB, {
	useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Clear
Brewery.collection.drop();
BrewCategory.collection.drop();
Brew.collection.drop();
Lineup.collection.drop();

var breweries = [];
var brewCategories = [];
var brews = [];
var lineups = [];

console.log('Populating DB with test data.');

//////////////////////
// Breweries
//////////////////////

function createBrewery(code, name, description, address, city, province, country, postal, website, twitter, instagram, facebook, youtube, currentTapLineup, currentTakeoutLineup, cb) {
	var breweryDetail = {
		code: code,
		name: name
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
      cb(err, null)
      return
    }

    console.log('New Brewery: ' + brewery);
    breweries.push(brewery)
    cb(null, brewery)
  });
}

function createBreweries(cb) {
  async.parallel([
	    function(callback) {
	      createBrewery(
					'brewery1',
					'Brewery 1',
					'A cool brewery.',
					'123 Fake Street',
					'Vancouver',
					'BC',
					'Canada',
					'A1B2C3',
					'https://www.brewery1.com',
					false,
					false,
					false,
					false,
					false,
					false,
					callback
				);
	    },
			function(callback) {
	      createBrewery(
					'brewery2',
					'Brewery 2',
					'Another cool brewery.',
					'456 Fake Street',
					'Vancouver',
					'BC',
					'Canada',
					'D4E5F6',
					'https://www.brewery2.com',
					false,
					false,
					false,
					false,
					false,
					false,
					callback
				);
	    }
    ],
	  cb
	);
}

//////////////////////
// Brew Categories
//////////////////////

function createBrewCategory(name, parentCategory, cb) {
	var brewCategoryDetail = {
		name: name
	};
  if (parentCategory != false) brewCategoryDetail.parentCategory = parentCategory;

  var brewCategory = new BrewCategory(brewCategoryDetail);

  brewCategory.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }

    console.log('New Brew Category: ' + brewCategory);
    brewCategories.push(brewCategory);
    cb(null, brewCategory);
  });
}

function createBrewCategories(cb) {
  async.parallel([
	    function(callback) {
	      createBrewCategory(
					'IPA',
					false,
					callback
				);
	    },
			function(callback) {
	      createBrewCategory(
					'Pilsner',
					false,
					callback
				);
	    }
    ],
	  cb
	);
}

function createBrewSubCategories(cb) {
  async.parallel([
			function(callback) {
	      createBrewCategory(
					'IPA Sub Category',
					brewCategories[0],
					callback
				);
	    }
    ],
	  cb
	);
}

//////////////////////
// Brews
//////////////////////

function createBrew(name, description, percentage, brewery, categories, cb) {
	var brewDetail = {
		name: name,
		brewery: brewery
	};
  if (description != false) brewDetail.description = description;
	if (percentage != false) brewDetail.percentage = percentage;
	if (categories != false) brewDetail.categories = categories;

  var brew = new Brew(brewDetail);

  brew.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }

    console.log('New Brew: ' + brew);
    brews.push(brew);
    cb(null, brew);
  });
}

function createBrews(cb) {
  async.parallel([
	    function(callback) {
	      createBrew(
					'Bitter AF',
					'Super bitter beer.',
					5.5,
					breweries[0],
					[brewCategories[0]],
					callback
				);
	    },
			function(callback) {
	      createBrew(
					'Smooth AF',
					'Real smooth beer.',
					6.5,
					breweries[0],
					[brewCategories[1]],
					callback
				);
	    },
			function(callback) {
	      createBrew(
					'Fruity AF',
					'Overly fruity beer.',
					4.5,
					breweries[0],
					[brewCategories[2]],
					callback
				);
	    },
			function(callback) {
	      createBrew(
					'Tears of Joy',
					'Beer brewed from tears of joy.',
					7,
					breweries[1],
					[brewCategories[0]],
					callback
				);
	    },
			function(callback) {
	      createBrew(
					'Eggplant Juices',
					'Beer brewed from the finest eggplants.',
					5,
					breweries[1],
					[brewCategories[1]],
					callback
				);
	    }
    ],
	  cb
	);
}

//////////////////////
// Lineup
//////////////////////

function createLineup(brewery, publishedDate, brews, cb) {
	var lineupDetail = {
		brewery: brewery,
		publishedDate: publishedDate,
		brews: brews
	};

  var lineup = new Lineup(lineupDetail);

  lineup.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }

    console.log('New Lineup: ' + lineup);
    lineups.push(lineup);
    cb(null, lineup);
  });
}

function createLineups(cb) {
  async.parallel([
	    function(callback) {
	      createLineup(
					breweries[0],
					Date.now(),
					[brews[0], brews[1], brews[2]],
					callback
				);
	    },
			function(callback) {
	      createLineup(
					breweries[0],
					Date.now(),
					[brews[0], brews[1]],
					callback
				);
	    },
			function(callback) {
	      createLineup(
					breweries[1],
					Date.now(),
					[brews[3], brews[4]],
					callback
				);
	    },
			function(callback) {
	      createLineup(
					breweries[1],
					Date.now(),
					[brews[3]],
					callback
				);
	    }
    ],
	  cb
	);
}

////////////////////////////////////////////
// Update Brewery Current Lineups
////////////////////////////////////////////

function updateBreweryLineup(name, tapLineup, takeoutLineup, cb) {
	updates = {}
	if (tapLineup != false) updates.currentTapLineup = tapLineup;
	if (takeoutLineup != false) updates.currentTakeoutLineup = takeoutLineup;

	Brewery.update({name: name}, updates, function(err, numberAffected, rawResponse) {
		console.log(name + " updated.");
		cb(null, rawResponse);
	});
}

function updateBreweryLineups(cb) {
	async.parallel([
			function(callback) {
				updateBreweryLineup(
					'Brewery 1',
					lineups[0],
					lineups[1],
					callback
				);
			},
			function(callback) {
				updateBreweryLineup(
					'Brewery 2',
					lineups[3],
					false,
					callback
				);
			}
		],
		cb
	);
}

//////////////////////
// Main
//////////////////////

async.series([
	  createBreweries,
		createBrewCategories,
		createBrewSubCategories,
		createBrews,
		createLineups,
		updateBreweryLineups
	],
	// Callback
	function(err, results) {
    if (err) {
      console.log('Final Error: '+err);
    } else {
			console.log('Successfully populated database');
		}
    mongoose.connection.close();
	}
);
