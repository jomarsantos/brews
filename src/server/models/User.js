var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = Schema({
  name: {type: String, required: true},
	fbUserId: {type: String, required: true},
	email: {type: String, required: false},
	picture: {type: String, required: false},
	favorites: [{type: Schema.ObjectId, ref: 'Brew', required: true}]
});

module.exports = mongoose.model('User', UserSchema);
