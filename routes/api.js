var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var elo = require("elo-rank")(15);
require( __dirname + '/../models/playerSchema.js');
require( __dirname + '/../models/matchSchema.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: "Psi U Pool", paragraph: "An \"I'd Prather Not\" Production",
                    header: "If you seed matches, the goons will find you!"});
});

router.get('/player', function(req, res) {
	mongoose.model("player").find().sort('-elo_rank -Wins Loses').exec(function(err, players){
	res.json( players );
	})
} );

router.get('/player/:uId', function(req, res) {
	mongoose.model("player").find({_id: req.params.uId},function(err, player){
	res.json( player );
	})
} );

router.post( '/player', function(req, res) {
	var player = mongoose.model("player");
	var newPlayer = new player(req.body);
	newPlayer.save(function (err) {
  		if (err) return console.error(err);
	});

	res.json(newPlayer);
});

router.get( '/match', function(req, res) {
	mongoose.model("match").find(function(err, matches){
	   mongoose.model("match").populate( matches, [
       {path: "Winner"},
       {path: "Looser"}
     ], function( err, matches ){
      res.json(matches);
     });
	})
});

router.get('/match/:uId', function(req, res) {
	mongoose.model("match").find({_id: req.params.uId},function(err, match){
	   mongoose.model("match").populate( match, [
       {path: "Winner"},
       {path: "Looser"}
       ], function( err, match ){
         res.json(match);
       });
  })
});

router.post( '/match', function(req, res) {
	var match = mongoose.model("match");
  var winner = mongoose.Types.ObjectId(req.body.Winner);
	var looser = mongoose.Types.ObjectId(req.body.Looser);
  var newMatch = new match({Winner: winner, Looser: looser} );
	newMatch.save(function (err) {
  		if (err) return console.error(err);
	});

  mongoose.model("player").findById( winner, function( err, Winner ){
    mongoose.model("player").findById( looser, function( err, Looser ){
      var expWinner = elo.getExpected(Winner.elo_rank, Looser.elo_rank);
      var expLooser = elo.getExpected(Looser.elo_rank, Winner.elo_rank);

      Winner.elo_rank = elo.updateRating( expWinner, 1, Winner.elo_rank);
      Looser.elo_rank = elo.updateRating( expLooser, 0, Looser.elo_rank);

      Winner.Wins += 1;
      Looser.Loses += 1;

      Winner.save();
      Looser.save();
    })
  })
	res.json(newMatch);
});

module.exports = router;
