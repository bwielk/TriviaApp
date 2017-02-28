var Admin = require('../models/admin.js');
var adminUI = require('./adminUI');

var adminAuthorisationUI = function(){
  document.getElementById('welcome_content').style = "display:none";
  document.getElementById('question').style = "display: inline";
  var buttons = document.getElementById('buttons');
  buttons.style = "display:none";
  this.setBackground("TV");
  this.createAuthForm();
}

adminAuthorisationUI.prototype = {

  removeContent: function(htmlElementId) {
    var toClear = document.getElementById(htmlElementId);
    while (toClear.firstChild) {
      toClear.removeChild(toClear.firstChild);
    }
  },

  setBackground: function(name){
    document.body.style.backgroundImage = "url('./" + name + ".jpg')";
  },

  checkPassword: function(info, div, password, admin){
    if(password.value === admin.password){
      new adminUI();
    }else{
      info.innerText = "THE PASSWORD IS INCORRECT! TRY AGAIN";
      info.style.cssText = "color: red";
      div.appendChild(info);
     }
  },

  createEnterButton: function(div, inputField, admin){
    var button = document.createElement('button');
    var info = document.createElement('p');
    button.innerText = "GO";
    div.appendChild(button);
    button.addEventListener('click', function(){
      this.checkPassword(info, div, inputField, admin)}.bind(this));
  },

  createAuthForm: function(){
    var admin = new Admin();
    var div = document.getElementById('question');
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