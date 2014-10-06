var mongoose = require("mongoose");
var schema = mongoose.Schema;

var matchSchema = new schema({
	date: { type: Date, default: Date.now() },
	Winner: {
		type: schema.ObjectId,
		ref: 'player'
	},
	Looser: {
		type: schema.ObjectId,
		ref: 'player'
	}
});

mongoose.model( 'match', matchSchema );