var welcomeUI = require('../views/welcomeUI.js');

var app = function() {
  new welcomeUI();
}

window.onload = app;