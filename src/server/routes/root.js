var express = require('express');
var router = express.Router();

router.get('/', function response(req, res) {
	res.send('Display usage.');
});

router.get('/*', function response(req, res) {
	console.log(req);
	res.json({
    error: {
			'status': 404,
			'title': 'Invalid API Request',
			'message': 'Visit ' + req.protocol + '://' + req.get('host') + '/api for documentation.',
    },
  });
});

module.exports = router;
