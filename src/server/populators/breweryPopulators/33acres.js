const url = 'http://33acresbrewing.com/our-beers/';
const code = '33acres';
const codeTag = '['+ code + '] ';
const SUCCESS = 'Success';
const FAIL = 'Fail';

var axios = require('axios');
var cheerio = require('cheerio');
var q = require('q');
var Brew = require('../../models/Brew');
var Brewery = require('../../models/Brewery');
var Lineup = require('../../models/Lineup');

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
							console.log(codeTag + 'Brew ' + tapBrew.name + ' already exists for this brewery in the database')
							resolve(err.existingBrew);
						} else {
							// Unknown error saving to database
							console.log(codeTag + 'ERROR: ' + err);
							errors.push('Could not save ' + tapBrew.name + ' to the database. (' + err.message + ')');
							reject(err);
						}
					} else {
						// Brew was saved to database
						console.log(codeTag + 'New brew "' + tapBrew.name + '" added to the database')
						resolve(tapBrew);
					}
				}
			);
		}
	)
}

module.exports = {
  execute: function (callback) {
		console.log(codeTag + '* UPDATE 33 ACRES LINEUPS *');

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
					axios.get(url).then(
						function(response) {
							var $ = cheerio.load(response.data);
							$('.beer-row .beer-info').each(
								function(item) {
									// Grab data for brew
									var brewName = $(this).find('h1').text();
									var brewSubtitle = $(this).find("h4:contains('Style: ')")
										.first().text().replace('Style: ', '').trim();
									var brewPercentage = $(this).find("h4:contains('Alcohol: ')")
										.first().text().replace('Alcohol: ', '').replace('% by volume', '').trim();
									var brewDescription = $(this).find("h4:contains('Flavour: ')")
										.first().text().replace('Flavour: ', '').trim()

									// Create new brew
									var brewDetail = {
										name: brewName,
										subtitle: brewSubtitle,
										description: brewDescription,
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
											console.log(codeTag + 'ERROR: ' + err);
											errors.push('Could not save tap lineup to the database. (' + err.message + ')');
											return results(callback);
										} else {
											console.log(codeTag + 'New tap lineup added to the database')
											// Update brewery lineup
											var updates = {
												currentTapLineup: tapLineup
											};
											Brewery.update(brewery, updates, function(err, numberAffected, rawResponse) {
												if (err) {
													console.log(codeTag + 'ERROR: ' + err);
													errors.push('Could not update database with brewery\'s tap lineup. (' + err.message + ')');
													return results(callback);
												} else {
													console.log(codeTag + 'Brewery\'s tap lineup updated in database')
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
							console.log(codeTag + 'ERROR: Could not handle request.');
							errors.push('Could not handle request.');
							return results(callback);
						}
					);;
				} else {
					// Brewery does not exist
					console.log(codeTag + 'ERROR: No brewery with code "' + code + '" found in database');
					errors.push('Brewery does not exist in the database.');
					return results(callback);
				}
			}
		)
  }
};
