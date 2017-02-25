var Admin = require('../models/admin.js');
var adminUI = require('./adminUI');

var adminAuthorisationUI = function(){
  this.removeContent('main');
  this.createAuthForm();
}

adminAuthorisationUI.prototype = {

  removeContent: function(htmlElementId) {
    var toClear = document.getElementById(htmlElementId);
    while (toClear.firstChild) {
        toClear.removeChild(toClear.firstChild);
    }
  },

  checkPassword: function(div, password, admin){
    if(password.value === admin.password){
      new adminUI();
    }else{
      var info = document.createElement('p');
      info.style.textCss = "color: red";
      info.innerText = "THE PASSWORD IS INCORRECT! TRY AGAIN";
      div.appendChild(info);
    };
  },

  createEnterButton: function(div, inputField, admin){
    var button = document.createElement('button');
    button.innerText = "GO";
    div.appendChild(button);
    button.addEventListener('click', function(){
      this.checkPassword(div, inputField, admin)}.bind(this));
  },

  createAuthForm: function(){
    var admin = new Admin();
    var div = document.getElementById('main');
    var gobackbutton = this.createGoBackButton(div);
    var p = document.createElement('p');
    p.innerText = "ENTER THE ADMIN PASSWORD";
    var password = document.createElement('input');
    password.type = "password";
    password.size = "30";
    div.appendChild(password);
    this.createEnterButton(div, password, admin);
    div.appendChild(p);
  },

  handleGoBackButtonClick: function(){
    window.location = "/";
  },

  createGoBackButton: function(container){
    var goBackButton = document.createElement("button");
    goBackButton.innerText = "GO BACK";
    container.appendChild(goBackButton);
    goBackButton.onclick = this.handleGoBackButtonClick;
  }
};


module.exports = adminAuthorisationUI;