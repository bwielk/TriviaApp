var gameUI = require('../views/gameUI.js');

var app = function() {
  new gameUI();
}

window.onload = app;