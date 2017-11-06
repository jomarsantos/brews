var express = require('express');
var router = express.Router();
const Test = require('../models/Test');

router.get('/', function (req, res) {
	Test.find({}, function (err, test) {
	  if (err) {
			return handleError(err)
		} else {
			res.send(test);
		}
	})
})

router.post('/', function (req, res) {
	var testInstance = new Test({
		a: req.body.a,
		b: req.body.b
	});

	testInstance.save(function (err) {
	  if (err) {
			res.send(err);
		} else {
			res.send('Success');
		}
	});
})

module.exports = router;
