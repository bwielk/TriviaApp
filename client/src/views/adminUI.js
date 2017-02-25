var Questions = require('../models/questions.js');

var adminUI = function(){
  this.removeContent('main')
  this.adminForm();
  var questions = new Questions();
  questions.all(function(result){
    this.getQuestions(result);
  }.bind(this));
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
    var newline = document.createElement('br');
    input.type = type;
    input.name = name;
    input.placeholder = value;
    input.size = size;
    form.appendChild(newline);
    form.appendChild(input);
  },

  createSubmitButton: function(form, type, value){
    var newline = document.createElement('br');
    var submit = document.createElement('input');
    submit.type = type;
    submit.value =  value;
    form.appendChild(newline);
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
    var newline = document.createElement('br');
    var submitButton = this.createSubmitButton(form, "submit", "SAVE");
    div.appendChild(form);
  },

  getQuestions: function(questions){
    var main = document.getElementById('main');
    for(var question of questions){
     var field = document.createElement('div');
      field.style.cssText = "border: 1px solid black; background-color: grey; max-height: 200px; width: 300px; margin-bottom: 1%";
      var p1= document.createElement('p');
      p1.innerText = question.questionString;
      var list  = document.createElement('ul');
      list.style.cssText = "list-style: none";
      correctAnswer = question.correctAnswer;
      for(var answer of question.possibleAnswers){
        var li = document.createElement('li'); 
        if(answer === correctAnswer){
          li.innerText = answer;
          li.style.cssText = "background-color: green";
        }else{
          li.innerText = answer;
        };
        list.appendChild(li);
      }
      field.appendChild(p1);
      field.appendChild(list);
      main.appendChild(field);
    }
  }

}


  module.exports = adminUI;