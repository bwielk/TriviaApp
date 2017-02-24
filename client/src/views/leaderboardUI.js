var Players = require('../models/players');

var leaderboardUI = function(){
  var players = new Players();
  players.all(function(result){
    this.render(result);
  }.bind(this));
};

leaderboardUI.prototype = {
  render: function(players){
    var maindiv = document.getElementById('main');
    var list = document.createElement('ol');
    var sortedArray = players.sort(function(a, b){
      return a.scores - b.scores;
    }).reverse();
    for(var player of sortedArray){
      var li = document.createElement('li');
      li.innerText = "NAME: " + player.name + " \n SCORES(total): " + player.scores + "";
      list.appendChild(li);
    }
    maindiv.appendChild(list);
  }
}


module.exports = leaderboardUI;