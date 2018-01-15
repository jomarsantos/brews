var express = require('express');
var router = express.Router();
var FB = require('fb');
const User = require('../models/User');

router.post('/', function (req, res) {
	console.log(req.body);
	FB.api('/me', { fields: 'id,name', access_token: req.body.fbAccessToken }, function (response) {
    if(response && response.error) {
			// Error 0: Response error from Facebook request
			console.log(response.error);
			res.send({
				success: false,
				msg: "Unable to log in. Please contact an admin. (Error 0)"
			});
    }
    else if (response.id === req.body.fbUserId) {
			User.find({fbUserId: req.body.fbUserId}).exec(function (err, user) {
			  if (err) {
					// Error 1: Problem querying database
					res.send({
						success: false,
						msg: "Unable to log in. Please contact an admin. (Error 1)"
					});
				} else if (user.length === 0) {
					// Success: First Time / Create Record
					var userDetail = {
						name: response.name,
						fbUserId: response.id,
						favorites: []
					};
					var user = new User(userDetail);
					user.save(function (err) {
					  if (err) {
							// Error 2: Problem saving to database
							res.send({
								success: false,
								msg: "Unable to log in. Please contact an admin. (Error 2)"
							});
					  } else {
							res.send({
								success: true,
								new: true,
								user: {
									id: user._id,
									name: user.name,
									favorites: user.favorites
								}
							});
						}
					});
				} else if (user.length > 1) {
					// Error 3: More than 1 user with same Facebook ID
					res.send({
						success: false,
						msg: "Unable to log in. Please contact an admin. (Error 3)"
					});
				} else {
					// Success: Already a User
					res.send({
						success: true,
						new: false,
						msg: "Successfully logged in.",
						user: {
							id: user[0]._id,
							name: user[0].name,
							favorites: user[0].favorites
						}
					});
				}
			})
    } else {
			// Error 4: User tried logging in but IDs don't match (hacking?)
			res.send({
				success: false,
				msg: "Unable to log in. Please contact an admin. (Error 4)"
			});
		}
	});
})

module.exports = router;
