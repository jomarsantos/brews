var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BrewerySchema = Schema({
	code: {type: String, required: true},
  name: {type: String, required: true},
	description: {type: String, required: false},
	address: {type: String, required: false},
	city: {type: String, required: false},
	province: {type: String, required: false},
	country: {type: String, required: false},
	postal: {type: String, required: false},
	website: {type: String, required: false},
	twitter: {type: String, required: false},
	instagram: {type: String, required: false},
	facebook: {type: String, required: false},
	youtube: {type: String, required: false},
	currentTapLineup: {type: Schema.ObjectId, ref: 'Lineup', required: false},
	currentTakeoutLineup: {type: Schema.ObjectId, ref: 'Lineup', required: false},
	importActivated: {type: Boolean, required: true},
});

module.exports = mongoose.model('Brewery', BrewerySchema);
