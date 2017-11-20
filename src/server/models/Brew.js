var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BrewSchema = Schema({
  name: {type: String, required: true},
	subtitle: {type: String, required: false},
	description: {type: String, required: false},
	percentage: {type: Number, required: false},
	brewery: {type: Schema.ObjectId, ref: 'Brewery', required: true},
	categories: [{type: Schema.ObjectId, ref: 'BrewCategory', required: false}]
});

// Validate that a brew with a specific name doesn't already exist for a brewery
BrewSchema.pre("save", true, function(next, done) {
  var self = this;
  mongoose.models["Brew"].findOne({name: self.name, brewery: self.brewery}, function(err, brew) {
	  if(err) {
      done(err);
	  } else if (brew) {
      self.invalidate("name", "Brew already exists for this brewery.");
			var error = new Error("Brew already exists for this brewery.");
			error.type = 'validation';
			error.existingBrew = brew;
      done(error);
	  } else {
      done();
	  }
  });
  next();
});

module.exports = mongoose.model('Brew', BrewSchema);
