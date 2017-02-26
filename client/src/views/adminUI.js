var Questions = require('../models/questions.js');
var Question = require('../models/question.js');

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

  createInput: function(form, className, type, name, value, size){
    var input = document.createElement('input');
    var newline = document.createElement('br');
    input.class = className;
    input.type = type;
    input.name = name;
    input.placeholder = value;
    input.size = size;
    form.appendChild(newline);
    form.appendChild(input);
  },

  createSubmitButton: function(form, name, type, value){
    var newline = document.createElement('br');
    var submit = document.createElement('input');
    submit.name
    submit.type = type;
    submit.value =  value;
    form.appendChild(newline);
    form.appendChild(submit);
  },

  createDeleteButton: function(form, name, type, value){///!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   var newline = document.createElement('br');
   var submit = document.createElement('input');
   submit.name = name;
   submit.type = type;
   submit.value = value;
   form.appendChild(newline);
   form.appendChild(submit);
  },

  adminForm: function(){
    var div = document.getElementById('main');
    var form = document.createElement('form');
    // form.action = "/api/players";
    this.createInput(form, "question", "text", "question", "Your question: ", "50");
    this.createInput(form, "option", "text", "A", "A:", "20");
    this.createInput(form, "option", "text", "B", "B:", "20");
    this.createInput(form, "option","text", "C", "C:", "20");
    this.createInput(form, "option", "text", "D", "D:", "20");
    this.createInput(form, "correct", "text", "correct", "Correct Answer", "20");
    this.createInput(form, "category", "text", "category", "Category", "20");

    var allAnswers = function(){
      var values = [];
      var arr = document.getElementsByClassName('option');
      console.log(arr);
      for(var element of arr){
        values.push(e.target.option.value);
      }
      return values;
    }

    form.onsubmit = function(e){

      e.preventDefault();
      var newQuestion = new Question({
        questionString: e.target.question.value,
        possibleAnswers: [e.target.A.value, e.target.B.value, e.target.C.value, e.target.D.value],
        correctAnswer: e.target.correct.value,
        category: e.target.category.value
      })

      var allQuestions = new Questions();
      allQuestions.add(newQuestion, function(data){
        console.log(data);
      })
    }

    var newline = document.createElement('br');
    var submitButton = this.createSubmitButton(form, "submit", "SAVE");
    div.appendChild(form);
  },

  getQuestions: function(questions){
    var main = document.getElementById('main');
    var index = 0;
    for(var question of questions){
      var deleteForm = document.createElement('form');
      deleteForm.action = "/api/questions/" + index;
      console.log(deleteForm.action);
      // deleteForm.action = "/api/questions/" + id + "";////!!!!!
      deleteForm.method = "delete";//// !!!!!
      var field = document.createElement('div');
      field.style.cssText = "border: 1px solid black; background-color: grey; max-height: 300px; width: 300px; margin-bottom: 1%";
      var p1= document.createElement('p');
      p1.innerText = question.questionString;
      var list  = document.createElement('ul');
      list.style.cssText = "list-style: none";
      var correctAnswer = question.correctAnswer;
      var category = question.category;
      for(var answer of question.possibleAnswers){
        var li = document.createElement('li'); 
        if(answer === correctAnswer){
          li.innerText = answer;
          li.style.cssText = "background-color: green";
        }else{
          li.innerText = answer;
        };
        list.appendChild(li);
        var ctg = document.createElement('p');
        ctg.innerText = "CATEGORY: " + category;
      };

      var deleteButton = this.createDeleteButton(deleteForm, index, "submit", "DELETE"); ////!!!!

      field.appendChild(deleteForm); //!!!!!!

      field.appendChild(p1);
      field.appendChild(list);
      field.appendChild(ctg);
      main.appendChild(field);
      index++;
    }
  }
}


module.exports = adminUI;