var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
const Brew = require('../models/Brew');
const Brewery = require('../models/Brewery');
const User = require('../models/User');

router.get('/favorites', function (req, res) {
	if (!req.query.hasOwnProperty('userId')) {
		res.send({
			success: false,
			msg: "Request body must contain userId."
		});
	}

	var breweryMapping = {};
	User.find({_id: req.query.userId}).populate({
		path: 'favorites',
		model: 'Brew',
		select: {
			'_id': 1,
			'name': 1,
			'subtitle': 1,
			'percentage': 1,
			'categories': 1,
			'brewery': 1,
		}
	}).exec().then(
		function(user) {
			if (user.length === 0) {
				// Error: Invalid userId
				res.send({
					success: false,
					msg: "No user found with userId."
				});
			} else {
				user[0].favorites.forEach((brew, index) => {
					if (!breweryMapping.hasOwnProperty(brew.brewery)) {
						breweryMapping[brew.brewery] = [];
					}

					breweryMapping[brew.brewery].push(brew);
				});

				let breweryPromises = [];
				Object.keys(breweryMapping).forEach((breweryId, index) => {
					breweryPromises.push(Brewery.find({_id: breweryId}).select('code name logo website'));
				});

				return Promise.all(breweryPromises);
			}
		}
	).then(
		function(breweries) {
			let favorites = [];
			breweries.forEach((brewery, index) => {
				brewery = JSON.parse(JSON.stringify(brewery[0]));
				brewery['brews'] = breweryMapping[brewery._id];
				favorites.push(brewery);
			});

			res.send({
				success: true,
				msg: 'Successfully retrieve user favorites.',
				favorites: favorites
			});
		}
	)
});

router.post('/favorites', function (req, res) {
	if (!req.body.hasOwnProperty('userId') || !req.body.hasOwnProperty('brewId')) {
		res.send({
			success: false,
			msg: "Request body must contain userId and brewId."
		});
	}

	User.find({_id: req.body.userId}).exec().then(
		function(user) {
			if (user.length === 0) {
				// Error: Invalid userId
				res.send({
					success: false,
					msg: "No user found with userId."
				});
			} else {
				Brew.find({_id: req.body.brewId}).exec().then(
					function(brew) {
						if (brew.length === 0) {
							// Error: Invalid brewId
							res.send({
								success: false,
								msg: "No brew found with brewId."
							});
						} else {
							favorites = user[0].favorites;
							let index = favorites.indexOf(brew[0]._id);
							let message = '';
							if (index >= 0) {
								// Brew currently favorited, untoggle
								favorites.splice(index, 1);
								message = 'Successfully removed favorited.';
							} else {
								// Brew currently not favorited, toggle
								favorites.push(brew[0]._id);
								message = 'Successfully added favorited.';
							}
							var updates = {
								favorites: favorites
							};
							User.update({_id: user[0]._id}, updates, function(err, numberAffected, rawResponse) {
								if (err) {
									// Error 0: Problem updating database with favorite
									res.send({
										success: false,
										msg: "Unable to toggle favorite. Please contact an admin. (Error 0)"
									});
								} else {
									res.send({
										success: true,
										msg: message,
										favorites: favorites
									});
								}
							});
						}
					}
				).catch(
					function(err) {
						// Error 1: Problem querying database for brew
						res.send({
							success: false,
							msg: "Unable to toggle favorite. Please contact an admin. (Error 1)"
						});
					}
				);
			}
		}
	).catch(
		function(err) {
			// Error 2: Problem querying database for user
			res.send({
				success: false,
				msg: "Unable to toggle favorite. Please contact an admin. (Error 2)"
			});
		}
	);
})

module.exports = router;
