var Questions = require('../models/questions.js');

var adminUI = function(){
<<<<<<< HEAD
  this.createForm();
}

adminUI.prototype = {
  createForm: function(){
    var div = document.getElementById('main');
    var adminForm = document.createElement('form');

    var questionInput = document.createElement('question');
    questionInput.setAttribute("name", "questionString");
    questionInput.setAttribute("value", "QUESTION");
    adminForm.appendChild(questionInput);

    var optionA = document.createElement('optionA');
    optionA.setAttribute("name", "possibleAnswers");
    optionA.setAttribute("value", "A");
    adminForm.appendChild(optionA);

    var optionB = document.createElement('optionB');
    optionB.setAttribute("name", "possibleAnswers");
    optionB.setAttribute("value", "B");
    adminForm.appendChild(optionB);

    var optionC = document.createElement('optionC');
    optionC.setAttribute("name", "possbileAnswers");
    optionC.setAttribute("value", "C");
    adminForm.appendChild(optionC);

    var optionD = document.createElement('optionD');
    optionD.setAttribute("name", "possibleAnswers");
    optionD.setAttribute("value", "D");
    adminForm.appendChild(optionD);

    div.appendChild(adminForm);
  }
}

module.exports = adminUI;
=======
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

  // createDeleteButton: function(form, type, value){///!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //  var newline = document.createElement('br');
  //  var submit = document.createElement('input');
  //  submit.type = type;
  //  submit.value = value;
  //  form.appendChild(newline);
  //  form.appendChild(submit);
  // },

  adminForm: function(){
    var div = document.getElementById('main');
    var form = document.createElement('form');
    form.action = "/api/questions";
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
      // var deleteForm = document.createElement('form'); ///!!!!!
      // var id = questions.indexOf(questions);///!!!!
      // deleteForm.action = "/api/questions/" + id + "";////!!!!!
      // deleteForm.method = "delete";//// !!!!!
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
      // var deleteButton = this.createDeleteButton(deleteForm, "submit", "DELETE"); ////!!!!
      // field.appendChild(deleteForm); //!!!!!!

      field.appendChild(p1);
      field.appendChild(list);
      field.appendChild(ctg);
      main.appendChild(field);
    }
  }

}


  module.exports = adminUI;
>>>>>>> develop
