var UI = require('./views/ui.js');
var welcomeUI = require('./views/welcomeUI.js');

var welcome = function() {
  new welcomeUI();
}

var app = function() {
  new UI();
}

window.onload = app;