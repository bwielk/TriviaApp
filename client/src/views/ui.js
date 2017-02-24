var Questions = require('../models/questions');

var UI = function() {
  var questions = new Questions();
  questions.all(function(result) {
    this.render(result[0]);
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
    var container = document.getElementById('question');
    var li = document.createElement('li');
    this.appendText(li, question.question, "Question: ")
    this.appendText(li, question.options[0], "A: ");
    this.appendText(li, question.options[1], "B: ");
    this.appendText(li, question.options[2], "C: ");
    this.appendText(li, question.options[3], "D: ");
    container.appendChild(li);
  }
}

module.exports = UI;