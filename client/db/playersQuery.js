var MongoClient = require('mongodb').MongoClient;

var PlayersQuery = function(){
  this.url = "mongodb://localhost:27017/trivia";
}

PlayersQuery.prototype = {
  all: function(onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      var players = db.collection('players');
      players.find().toArray(function(err, docs){
        onQueryFinished(docs)
      });
    });
  },

  add: function(newPlayer, onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      var players = db.collection('players');
      players.insert(newPlayer);
      players.find().toArray(function(err, docs){
        onQueryFinished(docs);
      });
    });
  }
}

module.exports = PlayersQuery;