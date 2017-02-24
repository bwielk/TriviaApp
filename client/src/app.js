var UI = require('./views/ui.js');
var welcomeUI = require('./views/welcomeUI.js');
var registrationUI = require('./views/registrationUI.js');

var welcome = function() {
  new welcomeUI();
}

var registration = function() {
  new registrationUI();
}

var app = function() {
  new UI();
}

window.onload = welcome;