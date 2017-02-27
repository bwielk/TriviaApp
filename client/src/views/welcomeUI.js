var gameUI = require('./gameUI.js');
var registrationUI = require('./registrationUI.js');
var leaderboardUI = require('./leaderboardUI.js');
// var adminUI = require('./adminUI.js');
var PlaySound = require('../models/playSound');
var adminAuthorisationUI = require('./adminAuthorisationUI.js');

var welcomeUI = function() {
  this.createWelcomeText();
  this.createPlayButton();
  this.createRegisterButton();
  this.createLeaderboardButton();
  this.createAdminButton();
}

welcomeUI.prototype = {

  createWelcomeText: function() {
    var welcomeText = document.createElement('p');
    welcomeText.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
    var div = document.getElementById('welcome_content')
    div.appendChild(welcomeText);
  }, 

  handlePlayButtonClick: function() {
    this.style.cssText = "display: none";
    new gameUI();
    var playSound = new PlaySound();

  },

  handleLeaderboardButtonClick: function(){
    this.style.cssText = "display: none";
    new leaderboardUI();
  },

  handleRegisterButtonClick: function() {
    new registrationUI();
  },

  handleAdminButtonClick: function(){
   new adminAuthorisationUI();

  },

  changeColour: function(object, color){
    object.cssText = "color:" + color;
  },

  createPlayButton: function() {
    var playButton = document.createElement('button');
    playButton.id = "buttonUI"
    playButton.innerText = "PLAY";
    var div = document.getElementById('buttons');
    div.appendChild(playButton);
    playButton.onclick = this.handlePlayButtonClick;
  }, 

  createRegisterButton: function() {
    var registerButton = document.createElement('button');
    registerButton.id = "buttonUI";
    registerButton.innerText = "REGISTER";
    var div = document.getElementById('buttons');
    div.appendChild(registerButton);
    registerButton.onclick = this.handleRegisterButtonClick;
  },

  createLeaderboardButton: function(){
    var leaderboardButton = document.createElement('button');
    leaderboardButton.id = "buttonUI";
    leaderboardButton.innerText = "LEADERBOARD";
    var div = document.getElementById('buttons');
    div.appendChild(leaderboardButton);
    leaderboardButton.onclick = this.handleLeaderboardButtonClick;
  },

  createAdminButton: function(){
    var adminButton = document.createElement('button');
   adminButton.id = "buttonUI";
    adminButton.innerText = "ADMIN";
    var div = document.getElementById('buttons');
    div.appendChild(adminButton);
    adminButton.onclick = this.handleAdminButtonClick;
  }
}

module.exports = welcomeUI;