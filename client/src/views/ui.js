var Questions = require('../models/questions');

var UI = function() {
  var questions = new Questions();
  questions.all(function(result) {
    console.log(result[0]);
    this.render(result[0]);
    console.log(result);
  }.bind(this));
}

UI.prototype = {
  createText: function(text, label) {
    var p = document.createElement('p');
    p.innerText = label + text;
    return p;
  }, 

  appendText: function(element, text, label) {
    var pTag = this.createText(text, label);
    element.appendChild(pTag);
  }, 

  render: function(question) {
    console.log(question);
    var container = document.getElementById('question');
    var li = document.createElement('li');
    console.log(question);
    this.appendText(li, question.questionString, "Question: ")
    this.appendText(li, question.possibleAnswers[0], "A: ");
    this.appendText(li, question.possibleAnswers[1], "B: ");
    this.appendText(li, question.possibleAnswers[2], "C: ");
    this.appendText(li, question.possibleAnswers[3], "D: ");
    container.appendChild(li);
  }
}

module.exports = UI;