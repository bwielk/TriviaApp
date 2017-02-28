var Questions = require('../models/questions.js');
var Question = require('../models/question.js');
var adminUI = require('./adminUI');

var adminUI = function(){
  this.removeContent('question');
  document.body.style.backgroundImage = "url('')";
  document.body.style.backgroundColor = "rgb(138, 138, 92)";
  this.adminForm();
  var questions = new Questions();
  questions.all(function(result){
    this.getQuestions(result);
  }.bind(this));
  document.getElementById('question').style = "display: inline";
};

adminUI.prototype = {
  removeContent: function(htmlElementId) {
    var toClear = document.getElementById(htmlElementId);
    while (toClear.firstChild) {
      toClear.removeChild(toClear.firstChild);
    }
  }, 

  handleGoBackButtonClick: function(){
    window.location = "/";
  },

  createGoBackButton: function(container){
    var goBackButton = document.createElement("button");
    goBackButton.innerText = "GO BACK";
    goBackButton.className = "buttonUI";
    goBackButton.style.cssText = "background-color:#89cff0; color: black";
    container.appendChild(goBackButton);
    goBackButton.onclick = this.handleGoBackButtonClick;
  },

  createInput: function(form, className, type, name, value, size){
    var input = document.createElement('input');
    var newline = document.createElement('br');
    input.class = className;
    input.type = type;
    input.name = name;
    input.placeholder = value;
    input.size = size;
    input.id = "adminInput";
    form.appendChild(newline);
    form.appendChild(input);
  },

  createSubmitButton: function(form, type, value){
    var newline = document.createElement('br');
    var submit = document.createElement('input');
    submit.type = type;
    submit.value = value;
    submit.className = "buttonUI";
    submit.style.cssText = "background-color:#bcf06e; color: black; margin: 0;";
    form.appendChild(newline);
    form.appendChild(submit);
  },

  createDeleteButton: function(form, name, type, value){///!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   var questions = new Questions();
   var newline = document.createElement('br');
   var submit = document.createElement('input');
   // var self = this;
   submit.name = name;
   submit.type = type;
   submit.value = value;
   submit.className = "buttonUI";
   submit.onclick = function(e) {
    e.preventDefault();
    questions.delete(name, function(){
      new adminUI;
      // console.log(self)
      // self.getQuestions();
    });
  };
  form.appendChild(newline);
  form.appendChild(submit);
},

adminForm: function(){
  var div = document.getElementById('question');
  // var div = document.getElementById('quiz_field');
 
  var form = document.createElement('form');
    // form.action = "/api/players";
    var goBack = this.createGoBackButton(div);

    this.createInput(form, "question", "textarea", "question", "Your question: ", "50");
    this.createInput(form, "option", "text", "A", "A:", "20");
    this.createInput(form, "option", "text", "B", "B:", "20");
    this.createInput(form, "option","text", "C", "C:", "20");
    this.createInput(form, "option", "text", "D", "D:", "20");
    this.createInput(form, "correct", "text", "correct", "Correct Answer", "20");
    this.createInput(form, "category", "text", "category", "Category", "20");

    // var allAnswers = function(){
    //   var values = [];
    //   var arr = document.getElementsByClassName('option');
    //   console.log(arr);
    //   for(var element of arr){
    //     values.push(e.target.option.value);
    //   }
    //   return values;
    // },

    form.onsubmit = function(e){

      e.preventDefault();
      var newQuestion = new Question({
        questionString: e.target.question.value,
        possibleAnswers: [e.target.A.value, e.target.B.value, e.target.C.value, e.target.D.value],
        correctAnswer: e.target.correct.value,
        category: e.target.category.value
      });

      var allQuestions = new Questions();
      allQuestions.add(newQuestion, function(data){
        new adminUI;
      });
    }

    var submitButton = this.createSubmitButton(form, 'submit', 'SAVE');
    div.appendChild(form);
  },

  getQuestions: function(questions){
    var main = document.getElementById('quiz_field');
    var index = 0;
    for(var question of questions){
      var deleteForm = document.createElement('form');
      deleteForm.action = "/api/questions/" + index;

      // console.log(deleteForm);
      // deleteForm.action = "/api/questions/" + id + "";////!!!!!
      deleteForm.method = "delete";//// !!!!!
      var field = document.createElement('div');
      field.style.cssText = "border: 7px solid black; background-color: grey; max-height: 300px; width: 900px; margin-bottom: 1%; border-radius: 4px; display:inline-block;";
      var p1= document.createElement('p');
      p1.innerText = question.questionString;
      p1.style.cssText = "font-family: Orbitron; margin-left: 4%";
      var list  = document.createElement('ul');
      list.style.cssText = "list-style: none; padding: 0% 5%";
      var correctAnswer = question.correctAnswer;
      var category = question.category;
      for(var answer of question.possibleAnswers){
        var li = document.createElement('li'); 
        if(answer === correctAnswer){
          li.innerText = answer;
          li.style.cssText = "background-color: green; font-family: Orbitron;";
        }else{
          li.innerText = answer;
          li.style.cssText = "font-family: Orbitron";
        };
        list.appendChild(li);
        var ctg = document.createElement('p');
        ctg.innerText = "CATEGORY: " + category;
        ctg.style.cssText = "font-family: Orbitron; margin-left: 4%";
      }; ////!!!!

      field.appendChild(deleteForm); //!!!!!!

      field.appendChild(p1);
      field.appendChild(list);
      field.appendChild(ctg);
      var deleteButton = this.createDeleteButton(deleteForm, index, "submit", "DELETE");
      main.appendChild(field);
      index++;

    }
  }
}


module.exports = adminUI;