var UI = require('./ui.js');


var welcomeUI = function() {
  this.createWelcomeText();
  this.createPlayButton();
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

  createPlayButton: function() {
    var playButton = document.createElement('button');
    playButton.innerText = "PLAY";
    var div = document.getElementById('main')
    div.appendChild(playButton);
    playButton.onclick = this.handleButtonClick;
  }

}

module.exports = welcomeUI;