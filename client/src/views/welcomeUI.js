var gameUI = require('./gameUI.js');
var registrationUI = require('./registrationUI.js');
var leaderboardUI = require('./leaderboardUI.js');
// var adminUI = require('./adminUI.js');
var PlaySound = require('../models/playSound');
var adminAuthorisationUI = require('./adminAuthorisationUI.js');

var welcomeUI = function() {
  document.getElementById('question').style = "display: none";
  document.getElementById('choices').style = "display: none";
  this.createWelcomeText();
  this.createPlayButton();
  // this.createRegisterButton();
  this.createLeaderboardButton();
  this.createAdminButton();
  
}

welcomeUI.prototype = {

  createWelcomeText: function() {
    var welcomeText = document.createElement('p');
    welcomeText.innerText = "Dude! How's it hangin'? Welcome back to the 90s, a time when your radical young mind was like a totally bodacious sponge. Your mind might heinously withered these days, but at least you have memories of the greatest decade ever. Take this test to see if those all night raves, hooch and destroyed your recollections. So quit clowinin'. There's the play button! let's bounce!";
    var div = document.getElementById('welcome_content');
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
    playButton.id = "buttonPlay";
    playButton.className = "buttonUI";
    playButton.innerText = "PLAY";
    playButton.style.cssText = "color: black; background-color: orange";
    var div = document.getElementById('buttons');
    div.appendChild(playButton);
    playButton.onclick = this.handlePlayButtonClick;
  }, 

  createRegisterButton: function() {
    var registerButton = document.createElement('button');
    registerButton.className = "buttonUI";
    registerButton.id = "buttonRegister";
    registerButton.innerText = "REGISTER";
    var div = document.getElementById('buttons');
    div.appendChild(registerButton);
    registerButton.onclick = this.handleRegisterButtonClick;
  },

  createLeaderboardButton: function(){
    var leaderboardButton = document.createElement('button');
    leaderboardButton.className = "buttonUI";
    leaderboardButton.id = "buttonLeader";
    leaderboardButton.innerText = "LEADERBOARD";
    leaderboardButton.style.cssText = "background-color:cyan";
    var div = document.getElementById('buttons');
    div.appendChild(leaderboardButton);
    leaderboardButton.onclick = this.handleLeaderboardButtonClick;
  },

  createAdminButton: function(){
    var adminButton = document.createElement('button');
   adminButton.className = "buttonUI";
   adminButton.id = "buttonAdmin";
    adminButton.innerText = "ADMIN";
    var div = document.getElementById('buttons');
    div.appendChild(adminButton);
    adminButton.onclick = this.handleAdminButtonClick;
  }
}

module.exports = welcomeUI;