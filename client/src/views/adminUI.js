var Questions = require('../models/questions.js');
var Question = require('../models/question.js');
var adminUI = require('./adminUI');

var adminUI = function(){

  document.body.style.backgroundImage = "url('')";
  document.body.style.backgroundColor = "rgb(138, 138, 92)";
  // document.getElementById('question').style = "display: none";
  document.getElementById('passwordField').style = "display: none";
  this.setup();

};

adminUI.prototype = {
  removeContent: function(htmlElementId) {
    var toClear = document.getElementById(htmlElementId);
    while (toClear.firstChild) {
      toClear.removeChild(toClear.firstChild);
    }
  }, 

  setup: function() {
    this.removeContent('quiz_field');
    this.adminForm();
    var questions = new Questions();
    questions.all(function(result){
      this.getQuestions(result);
    }.bind(this));
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
    submit.action = "/api/questions";
    submit.method = "post";
    submit.className = "buttonUI";
    submit.style.cssText = "background-color:#bcf06e; color: black; margin: 0;";
    form.appendChild(newline);
    form.appendChild(submit);
    return submit;
  },

  createDeleteButton: function(form, name, type, value){
    console.log("in createDeleteButton");
    var questions = new Questions();
    var newline = document.createElement('br');
    var submit = document.createElement('input');
    submit.name = name;
    submit.type = type;
    submit.value = value;
    submit.className = "buttonUI";
    submit.onclick = function(e) {
      e.preventDefault();
      questions.delete(name, function(){
        this.setup();    
      }.bind(this));
    }.bind(this);
    form.appendChild(newline);
    form.appendChild(submit);
  },

  adminForm: function(){
    console.log("in admin form");
    var div = document.getElementById('quiz_field');
    div.style.display = "inline";
    // var div = document.getElementById('quiz_field');
    var formField = document.createElement('div');
    formField.id = 'adminField';
    var form = document.createElement('form');

    div.appendChild(formField);
    formField.appendChild(form);

    var questionField = document.createElement('input');
    questionField.name = "question";
    questionField.rows = "4";
    questionField.cols = "20";
    questionField.placeholder = "Your question";
    questionField.id = "adminInput";
    questionField.style.cssText = "border: 1px solid black";
    form.appendChild(questionField);

    this.createInput(form, "option", "text", "A", "A:", "20");
    this.createInput(form, "option", "text", "B", "B:", "20");
    this.createInput(form, "option","text", "C", "C:", "20");
    this.createInput(form, "option", "text", "D", "D:", "20");
    this.createInput(form, "correct", "text", "correct", "Correct Answer", "20");
    this.createInput(form, "category", "text", "category", "Category", "20");
    console.log(form);
    var submitButton = this.createSubmitButton(form, 'submit', 'SAVE');
    var goBack = this.createGoBackButton(form);  
    console.log(submitButton);
    form.onsubmit = function(e){
      console.log(this);
      e.preventDefault();
      var newQuestion = new Question({
        questionString: e.target.question.value,
        possibleAnswers: [e.target.A.value, e.target.B.value, e.target.C.value, e.target.D.value],
        correctAnswer: e.target.correct.value,
        category: e.target.category.value
      });

      console.log(newQuestion);

      var allQuestions = new Questions();

      allQuestions.add(newQuestion, function(data){
        console.log(data);
      });
      this.setup();

    }.bind(this);
  },

  getQuestions: function(questions){
    var main = document.getElementById('quiz_field');
    var index = 0;
    for(var question of questions){
      var deleteForm = document.createElement('form');
      deleteForm.action = "/api/questions/" + index;
      deleteForm.style.cssText = "float: left"
      // console.log(deleteForm);
      // deleteForm.action = "/api/questions/" + id + "";////!!!!!
      deleteForm.method = "delete";//// !!!!!
      var field = document.createElement('div');
      field.style.cssText = "border: 7px solid black; background-color: grey; max-height: 300px; width: 900px; margin-bottom: 1%; border-radius: 4px; display:inline-block";
      infoField = document.createElement('div');
      infoField.style.cssText = "float: right; width: 650px"

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
      infoField.appendChild(p1);
      infoField.appendChild(list);
      infoField.appendChild(ctg);
      field.appendChild(infoField);

      var deleteButton = this.createDeleteButton(deleteForm, index, "submit", "DELETE");
      main.appendChild(field);
      index++;

    }
  }
}


module.exports = adminUI;