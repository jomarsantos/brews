var express = require('express');
var router = express.Router();
const Brewery = require('../models/Brewery');
const Brew = require('../models/Brew');
const BrewCategory = require('../models/BrewCategory');
const Lineup = require('../models/Lineup');

router.get('/', function (req, res) {
	Brewery.find()
		.populate({
	    path: 'currentTapLineup currentTakeoutLineup',
	    model: 'Lineup',
			select: {
				'_id': 1,
				'publishedDate': 1,
				'brews': 1,
			},
	    populate: {
	      path: 'brews',
	      model: 'Brew',
				select: {
					'_id': 1,
					'name': 1,
					'subtitle': 1,
					'description': 1,
					'percentage': 1,
					'categories': 1
				},
				populate: {
					path: 'categories',
					model: 'BrewCategory',
					select: {
						'_id': 0,
						'name': 1,
					},
				}
	    }
	  })
		.select('code name website')
		.exec(function (err, lineups) {
		  if (err) {
				return console.log(err);
			} else {
				res.send(lineups);
			}
		})
})

// router.post('/', function (req, res) {
// 	var testInstance = new Test({
// 		a: req.body.a,
// 		b: req.body.b
// 	});
//
// 	testInstance.save(function (err) {
// 	  if (err) {
// 			res.send(err);
// 		} else {
// 			res.send('Success');
// 		}
// 	});
// })

module.exports = router;
