var Players = require('../models/players');

var leaderboardUI = function(){
  this.removeContent("buttons");
  this.removeContent("quiz_field");
  this.createGoBackButton();
  var players = new Players();
  players.all(function(result){
    this.render(result);
  }.bind(this));
};

leaderboardUI.prototype = {
  removeContent: function(htmlElementId) {
    var toClear = document.getElementById(htmlElementId);
    while (toClear.firstChild) {
        toClear.removeChild(toClear.firstChild);
    }
  }, 

  render: function(players){
    var maindiv = document.getElementById('quiz_field');
    maindiv.id = "welcome_content";
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
  },

  handleGoBackButtonClick: function(){
    window.location = "/";
  },

  createGoBackButton: function(){
    var container = document.getElementById("quiz_field");
    var goBackButton = document.createElement("button");
    goBackButton.innerText = "GO BACK";
    goBackButton.className = "buttonUI";
    container.appendChild(goBackButton);
    goBackButton.onclick = this.handleGoBackButtonClick;
  }
}


module.exports = leaderboardUI;