var Admin = require('../models/admin.js');
var adminUI = require('./adminUI');

var adminAuthorisationUI = function(){
  document.getElementById('welcome_content').style = "display:none";
  // document.getElementById('question').style = "display: none";
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
      info.style.cssText = "color: pink";
      div.appendChild(info);
     }
  },

  createEnterButton: function(div, inputField, admin){
    var button = document.createElement('button');
    var info = document.createElement('p');
    button.innerText = "GO!";
    button.className = "buttonUI";
    button.style.cssText = "background-color: #93fdf9";
    div.appendChild(button);
    button.addEventListener('click', function(){
      this.checkPassword(info, div, inputField, admin)}.bind(this));
  },

  createAuthForm: function(){
    var admin = new Admin();
    var div = document.getElementById('quiz_field');
    var passwordField = document.createElement('div');
    passwordField.id = "passwordField";
    var p = document.createElement('p');
    p.innerText = "ENTER THE ADMIN PASSWORD";
    var password = document.createElement('input');
    password.type = "password";
    password.name = "password";
    password.size = "30";
    password.placeholder = "PASSWORD";
    password.id = "passwordInput";
    passwordField.appendChild(password);
    passwordField.appendChild(p);
    var gobackbutton = this.createGoBackButton(passwordField);
    this.createEnterButton(passwordField, password, admin);
    div.appendChild(passwordField);
  },

  handleGoBackButtonClick: function(){
    window.location = "/";
  },

  createGoBackButton: function(container){
    var goBackButton = document.createElement("button");
    goBackButton.innerText = "GO BACK";
    goBackButton.className = "buttonUI";
    goBackButton.style.cssText = "background-color: #93838a";
    container.appendChild(goBackButton);
    goBackButton.onclick = this.handleGoBackButtonClick;
  }
};


module.exports = adminAuthorisationUI;