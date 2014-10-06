var mongoose = require("mongoose");
var schema = mongoose.Schema;

var playerSchema = new schema({
	Name: [{ First: String, Last: String}],
	Wins: { type: Number, default: 0 },
	Loses: { type: Number, default: 0 },
	elo_rank: { type: Number, default: 1400 },
	password: String,
	Pledge_Year: Number,
	Nationality: String,
	Slogan: String,
	Status: String
});

mongoose.model( 'player', playerSchema );
