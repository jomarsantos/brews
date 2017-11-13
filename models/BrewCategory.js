var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BrewCategorySchema = Schema({
  name: {type: String, required: true},
	parentCategory: {type: Schema.ObjectId, ref: 'BrewCategory', required: false}
});

module.exports = mongoose.model('BrewCategory', BrewCategorySchema);
