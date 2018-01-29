var express = require('express');
var router = express.Router();
const Brew = require('../models/Brew');
const Brewery = require('../models/Brewery');
const Lineup = require('../models/Lineup');

router.get('/', function (req, res) {
	if (!req.query.hasOwnProperty('code')) {
		res.send({
			success: false,
			msg: "Request must contain a brewery code parameter."
		});
	} else {
		Brewery.find({code: req.query.code}).populate({
	    path: 'currentTapLineup',
	    model: 'Lineup',
			select: {
				'_id': 0,
				'publishedDate': 1,
				'brews': 1,
			}
	  }).exec().then(
			function(brewery) {
				if (brewery.length === 0) {
					// Error: Invalid brewId
					res.send({
						success: false,
						msg: "No brewery found under this code."
					});
				} else {
					Brew.find({brewery: brewery[0]._id}).exec().then(
						function(response) {
							let brews = [];
							if (response.length > 0) {
								brews = response;
							}

							res.send({
								success: true,
								details: brewery[0],
								brews: brews
							});
						}
					)
				}
			}
		)
	}

});

module.exports = router;
