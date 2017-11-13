var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BrewSchema = Schema({
  name: {type: String, required: true},
	description: {type: String, required: false},
	percentage: {type: Number, required: false},
	brewery: {type: Schema.ObjectId, ref: 'Brewery', required: true},
	category: {type: Schema.ObjectId, ref: 'BrewCategory', required: false}
});

module.exports = mongoose.model('Brew', BrewSchema);
