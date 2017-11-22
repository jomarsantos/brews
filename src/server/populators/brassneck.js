const url = 'http://brassneck.ca';
const code = 'brassneck';
const SUCCESS = 'Success';
const FAIL = 'Fail';

var axios = require('axios');
var cheerio = require('cheerio');
var q = require('q');
var Brew = require('../models/Brew');
var Brewery = require('../models/Brewery');
var Lineup = require('../models/Lineup');

var errors = []

function results(callback) {
	var completionResult = {
		brewery: code,
		status: errors.length == 0 ? SUCCESS : FAIL,
		errors: errors
	}
	callback(null, completionResult);
}

function createSavePromise(tapBrew) {
	return new Promise(
		function(resolve, reject) {
			tapBrew.save(
				function (err) {
					if (err) {
						if (err.type == 'validation') {
							// Brew already existed
							console.log('Brew ' + tapBrew.name + ' already exists for this brewery in the database')
							resolve(err.existingBrew);
						} else {
							// Unknown error saving to database
							console.log('ERROR: ' + err);
							errors.push('Could not save ' + tapBrew.name + ' to the database. (' + err.message + ')');
							reject(err);
						}
					} else {
						// Brew was saved to database
						console.log('New brew "' + tapBrew.name + '" added to the database')
						resolve(tapBrew);
					}
				}
			);
		}
	)
}

module.exports = {
  execute: function (callback) {
		console.log('* UPDATE BRASSNECK LINEUPS *');

		// Check if brewery exists in database
		Brewery.find({code: code}).exec().then(
			function(breweries) {
				if (breweries.length > 0) {
					// Brewery exists
					var brewery = breweries[0];
					var tapBrewPromises = []

					/////////////////////
					//// CUSTOM WORK ////
					/////////////////////

					// Request main page
					console.log(url);
					axios.get(url).then(
						function(response) {
							var $ = cheerio.load(response.data);
							$('#ontap-footer ul li .beertitle').each(
								function(item) {
									// Grab data for brew
									var brewName = $(this).text().trim();
									var brewSubtitle = $(this).parent().clone()
										.find("span:contains('kind:')")
										.parent().children().remove().end()
										.text().trim();
									var brewPercentage = $(this).parent().clone()
										.find("span:contains('abv:')")
										.parent().children().remove().end()
										.text().replace('%', '').trim();

									// Create new brew
									var brewDetail = {
										name: brewName,
										subtitle: brewSubtitle,
										// description: brewDescription,
										percentage: brewPercentage,
										brewery: brewery
									};
									var tapBrew = new Brew(brewDetail);

									// Add save promise to queue
									tapBrewPromises.push(createSavePromise(tapBrew));
								}
							);
						}

						////////////////////////////
						//// END OF CUSTOM WORK ////
						////////////////////////////
					).then(
						function() {
							q.all(tapBrewPromises)
							.then(
								function(tapBrews) {
									var lineupDetails = {
										brewery: brewery,
										publishedDate: Date.now(),
										brews: tapBrews
									};
									var tapLineup = new Lineup(lineupDetails);
									tapLineup.save(function (err) {
										if (err) {
											console.log('ERROR: ' + err);
											errors.push('Could not save tap lineup to the database. (' + err.message + ')');
											return results(callback);
										} else {
											console.log('New tap lineup added to the database')
											// Update brewery lineup
											var updates = {
												currentTapLineup: tapLineup
											};
											Brewery.update(brewery, updates, function(err, numberAffected, rawResponse) {
												if (err) {
													console.log('ERROR: ' + err);
													errors.push('Could not update database with brewery\'s tap lineup. (' + err.message + ')');
													return results(callback);
												} else {
													console.log('Brewery\'s tap lineup updated in database')
													return results(callback);
												}
											});
										}
									});
								}
							).catch(
								function(err) {
									// Error occurred while adding brews
									return results(callback);
								}
							);
						}
					).catch(
						function(err) {
							// Request errored out
							console.log('ERROR: HTTP request was not successful');
							errors.push('HTTP request was not successful.');
							return results(callback);
						}
					);;
				} else {
					// Brewery does not exist
					console.log('ERROR: No brewery with code "' + code + '" found in database');
					errors.push('Brewery does not exist in the database.');
					return results(callback);
				}
			}
		)
  }
};
