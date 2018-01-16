var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
const Brew = require('../models/Brew');
const User = require('../models/User');

router.post('/toggleFavorite', function (req, res) {
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
								message = 'Succesfully removed favorited.';
							} else {
								// Brew currently not favorited, toggle
								favorites.push(brew[0]._id);
								message = 'Succesfully added favorited.';
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
