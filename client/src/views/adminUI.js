var Questions = require('../models/questions.js');

var adminUI = function(){
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