var leaderboardUI = require('./leaderboardUI.js');
var GameOverSound = require('../models/gameOverSound');

var gameOverUI = function() {
  this.stringified = localStorage.getItem("currentPlayer");
  this.currentPlayer = JSON.parse(this.stringified);
  this.currentPlayerName = this.currentPlayer.name;
  this.currentPlayerScore = this.currentPlayer.score;
  this.container = document.getElementById('main');
  this.setup(); 
}

gameOverUI.prototype = {

  setup: function() {
    this.removeContent("main");
    this.removeContent("question");
    this.changeTitle();
    this.createOutcomeText();
    this.createLeaderboardButton();
    this.createStartNewGameButton();
    setTimeout(GameOverSound, 800);
  },

  showLeaderboard: function() {
    new leaderboardUI();
  },

  changeTitle: function() {
    var title = document.getElementsByTagName('title');
    title.innerText = "GAME OVER";
  },

  removeContent: function(htmlElementId) {
    var toClear = document.getElementById(htmlElementId);
    while (toClear.firstChild) {
        toClear.removeChild(toClear.firstChild);
    }
  }, 

  createOutcomeText: function() {
    var textField = document.createElement('h2');
    console.log(this.currentPlayer);
    textField.innerText = "You score " + this.currentPlayerScore;
    this.container.appendChild(textField);
  },

  createForm: function() {
    var form = document.createElement('form');
    form.action = "/api/players/";
    form.method = "post";
    this.container.appendChild(form);
    return form;
  },

  addInput: function(form, inputType, inputName, inputValue) {
    var input = document.createElement("input");
    input.type = inputType;
    input.name = inputName;
    input.value = inputValue;
    form.appendChild(input);
    return input;
  },

  createLeaderboardButton: function() {
    var form = this.createForm();
    var nameInput = this.addInput(form, "text", "name", "Input Name");
    nameInput.id = "nameInput";
    var scoresInput = this.addInput(form, "hidden", "scores", this.currentPlayerScore);
    scoresInput.id = "scoresInput";

    var submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Save to leaderboard";
    form.appendChild(submit);

    form.onsubmit = function(event) {
      event.preventDefault();
      var url = "/api/players";
      var nameInput = document.getElementById("nameInput");
      var scoresInput = document.getElementById("scoresInput");
      var params = "name="+nameInput.value+"&scores="+scoresInput.value;
      var request = new XMLHttpRequest();
      request.open("POST", url, true);
      request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      request.send(params);
      new leaderboardUI();
    };
  },

  handleNewGameButtonClick: function() {
    location.reload();
  },

 createStartNewGameButton: function(){
   var startNewGameButton = document.createElement('button');
   startNewGameButton.innerText = "Start New Game";
   var div = document.getElementById('main');
   div.appendChild(startNewGameButton);
   startNewGameButton.onclick = this.handleNewGameButtonClick;
 },

}

module.exports = gameOverUI;