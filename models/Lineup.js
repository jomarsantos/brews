var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LineupSchema = Schema({
	brewery: {type: Schema.ObjectId, ref: 'Brewery', required: true},
	publishedDate: {type: Date, required: true},
	brews: [{type: Schema.ObjectId, ref: 'Brew', required: true}]
});

module.exports = mongoose.model('Lineup', LineupSchema);
