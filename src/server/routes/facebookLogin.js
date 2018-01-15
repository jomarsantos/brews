var express = require('express');
var router = express.Router();
var FB = require('fb');

router.post('/', function (req, res) {
	FB.api('/me', { fields: 'id,name', access_token: req.body.accessToken }, function (response) {
    if(response && response.error) {
      if(response.error.code === 'ETIMEDOUT') {
          console.log('request timeout');
      }
      else {
          console.log('error', response.error);
      }
			// TODO: send error message
			res.send(response);
    }
    else if (response.id === req.body.userId) {
			res.send('Success: Create/Return User and Session/Token');
    } else {
			// TODO: userId doesn't match
			res.send('Invalid');
		}
	});
})

module.exports = router;
