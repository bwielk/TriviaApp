var UI = require('./ui.js');
var registrationUI = require('./registrationUI.js');
var leaderboardUI = require('./leaderboardUI.js');


var welcomeUI = function() {
  this.createWelcomeText();
  this.createPlayButton();
  this.createRegisterButton();
  this.createLeaderboardButton();
}

welcomeUI.prototype = {
  createWelcomeText: function() {
    var welcomeText = document.createElement('p');
    welcomeText.innerText = "This is a game";
    var div = document.getElementById('main')
    div.appendChild(welcomeText);
  }, 

  handleButtonClick: function() {
    new UI();
  },

  handleRegisterButtonClick: function() {
    new registrationUI();
  },

  handleLeaderboardButtonClick: function(){
    new leaderboardUI();
  },

  createPlayButton: function() {
    var playButton = document.createElement('button');
    playButton.innerText = "PLAY";
    var div = document.getElementById('main')
    div.appendChild(playButton);
    playButton.onclick = this.handleButtonClick;
  }, 

  createRegisterButton: function() {
    var registerButton = document.createElement('button');
    registerButton.innerText = "REGISTER";
    var div = document.getElementById('main')
    div.appendChild(registerButton);
    registerButton.onclick = this.handleRegisterButtonClick;
  },

  createLeaderboardButton: function(){
    var leaderboardButton = document.createElement('button');
    leaderboardButton.innerText = "LEADERBOARD";
    var div = document.getElementById('main');
    div.appendChild(leaderboardButton);
    leaderboardButton.onclick = this.handleLeaderboardButtonClick;
  }
}

module.exports = welcomeUI;