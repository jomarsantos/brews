var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TestSchema = Schema({
  a: {type: String, required: true},
	b: {type: String, required: true},
});

module.exports = mongoose.model('Test', TestSchema);
