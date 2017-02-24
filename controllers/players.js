var express = require('express');

Player = require('../client/src/models/player'); // requires the player object model
var playersRouter = express.Router();

PlayersQuery = require('../client/db/playersQuery');
var query = new PlayersQuery(); // requires the players query

playersRouter.get('/', function(req, res){
  query.all(function(results){
    res.json(results);
  });
});

playersRouter.get('/:id', function(req, res){
  query.all(function(results){
    res.json(results[req.params.id]);
  });
});

playersRouter.post('/', function(req, res){
  var newPlayer = new Player({
    name: req.body.name,
    password: req.body.password,
    scores: 0
  });
  console.log("PLAYER:", newPlayer);
  query.add(newPlayer, function(results){ //add method from playersQuery
    console.log("The results", results);
    res.json(results);
  });
});


module.exports = playersRouter;



