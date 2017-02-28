var adminUI = require('./adminUI');

var addedUI = function(){
  var field = document.getElementById('quiz_form');
  this.createGoBackButton(field);
}

addedUI.prototype = {

  handleGoBackButtonClick: function(){
    new adminUI();
  },

  createGoBackButton: function(container){
    var goBackButton = document.createElement("button");
    goBackButton.innerText = "GO BACK";
    goBackButton.className = "buttonUI";
    goBackButton.style.cssText = "background-color:#89cff0; color: black";
    container.appendChild(goBackButton);
    goBackButton.onclick = this.handleGoBackButtonClick;
  }
}

module.exports = addedUI;