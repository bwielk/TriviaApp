var gameUI = require('./views/gameUI.js');
var welcomeUI = require('./views/welcomeUI.js');
var registrationUI = require('./views/registrationUI.js');

var app = function() {
  new gameUI();
}

var welcome = function() {
  new welcomeUI();
}

var registration = function() {
  new registrationUI();
}

window.onload = welcome;