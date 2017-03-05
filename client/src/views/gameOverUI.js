var leaderboardUI = require('./leaderboardUI.js');
var GameOverSound = require('../models/gameOverSound');

var gameOverUI = function() {
  var div = document.getElementById('buttons');
  div.style.cssText = "width: 485px";
  this.stringified = localStorage.getItem("currentPlayer");
  this.currentPlayer = JSON.parse(this.stringified);
  this.currentPlayerName = this.currentPlayer.name;
  this.currentPlayerScore = this.currentPlayer.score;
  this.container = document.getElementById('quiz_field');
  var question2 = document.getElementById('question2');
  question2.style.display = "none";
  this.container.style.display = "inline";
  this.setup();
}

gameOverUI.prototype = {

  setup: function() {
    // this.removeContent("quiz_field");
    this.setBackground('music');
    this.removeContent("question2");
    this.removeContent("category");
    this.removeContent("lifesavers");
    this.changeTitle();
    this.createOutcomeText();
    var newField = document.createElement('div');
    var leader = this.createLeaderboardButton();
    var restart = this.createStartNewGameButton();
    newField.appendChild(leader);
    newField.appendChild(restart);
    var quizField = document.createElement('div');
    quizField.appendChild(newField);
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

  setBackground: function(name){
    document.body.style.backgroundImage = "url('./" + name + ".jpg')";
  },

  createOutcomeText: function() {
    var textField = document.createElement('h2');
    console.log(this.currentPlayer);
    textField.innerText = "You score " + this.currentPlayerScore;
    textField.style.cssText = "font-family: Orbitron; font-size: 130%; margin-left: 35%; background-color: rgb(138, 138, 92); border: 4px solid black; border-radius: 2px; padding: 1% 2%; width: 150px; text-align: center; margin: auto";
    this.container.appendChild(textField);
  },

  createForm: function() {
    var form = document.createElement('form');
    form.style.cssText = "background-color: rgb(138, 138, 92); font-family: Orbitron; width: 400px; font-weight: bold; padding: 2% 1%; border: 6px solid black; border-radius: 2%; margin: auto";
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
    input.id = inputValue;
    form.appendChild(input);
    return input;
  },

  createLeaderboardButton: function() {
    var form = this.createForm();
    var nameInput = this.addInput(form, "text", "name", "Input Name");
    nameInput.id = "nameInput";
    nameInput.className = "leaderboardSubmission";
    var scoresInput = this.addInput(form, "hidden", "scores", this.currentPlayerScore);
    scoresInput.id = "scoresInput";

    var submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Save to leaderboard";
    submit.className = "buttonUI";
    submit.style.cssText = "background-color: powderblue; color: black; padding: 2%; display: inline";
    form.appendChild(submit);

    form.onsubmit = function(event) {
      event.preventDefault();
      var url = "/api/players";
      var nameInput = document.getElementById("nameInput");
      nameInput.id = "passwordInput";
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
   startNewGameButton.className = "buttonUI";
   startNewGameButton.style.cssText = "background-color: orange; color: black;";
   startNewGameButton.innerText = "Start New Game";
   var div = document.getElementById('buttons');
   div.style.cssTest = "width: 485px";
   div.appendChild(startNewGameButton);
   startNewGameButton.onclick = this.handleNewGameButtonClick;
 }

}

module.exports = gameOverUI;