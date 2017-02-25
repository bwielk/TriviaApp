var Questions = require('../models/questions.js');

var adminUI = function(){
  this.removeContent('main')
  this.adminForm();
};

adminUI.prototype = {
  removeContent: function(htmlElementId) {
    var toClear = document.getElementById(htmlElementId);
    while (toClear.firstChild) {
        toClear.removeChild(toClear.firstChild);
    }
  }, 

  createInput: function(form, type, name, value, size){
    var input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = value;
    input.size = size;
    form.appendChild(input);
  },

  createSubmitButton: function(form, type, value){
    var submit = document.createElement('input');
    submit.type = type;
    submit.value =  value;
    form.appendChild(submit);
  },

  adminForm: function(){
    var div = document.getElementById('main');
    var form = document.createElement('form');
    form.action = "/api/players";
    form.method = "post";
    this.createInput(form, "text", "question", "Your question: ", "50");
    this.createInput(form, "text", "A", "A:", "20");
    this.createInput(form, "text", "B", "B:", "20");
    this.createInput(form, "text", "C", "C:", "20");
    this.createInput(form, "text", "D", "D:", "20");
    var submitButton = this.createSubmitButton(form, "submit", "SAVE");
    div.appendChild(form);
  }
}

module.exports = adminUI;