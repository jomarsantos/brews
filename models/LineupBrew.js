var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LineupBrewSchema = Schema({
	lineup: {type: Schema.ObjectId, ref: 'Lineup', required: true},
	brew: {type: Schema.ObjectId, ref: 'Brew', required: true}
});

module.exports = mongoose.model('LineupBrew', LineupBrewSchema);
