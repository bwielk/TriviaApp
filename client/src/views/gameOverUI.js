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
    setTimeout(GameOverSound, 400);
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
  },

  createLeaderboardButton: function() {
    var form = this.createForm();
    this.addInput(form, "text", "name", "Input Name");
    this.addInput(form, "hidden", "scores", this.currentPlayerScore);

    var submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Save to leaderboard";
    form.appendChild(submit);
  }
}

module.exports = gameOverUI;