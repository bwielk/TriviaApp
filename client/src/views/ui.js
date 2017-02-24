var Questions = require('../models/questions');

var UI = function() {
  var questions = new Questions();
  questions.all(function(result) {
    this.render(result[0]);
  }.bind(this));
}

UI.prototype = {
  createText: function(text) {
    var p = document.createElement('p');
    p.innerText = text;
    return p;
  }, 

  appendText: function(element, text) {
    var pTag = this.createText(text);
    element.appendChild(pTag);
  }, 

  checkAnswer: function(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
      console.log("correct");
    } else {
      console.log("incorrect");
    }
  },

  render: function(question) {
    var containerDiv = document.getElementById('question');
    var p = document.createElement('p');
    this.appendText(p, question.questionString)
    containerDiv.appendChild(p);

    question.possibleAnswers.forEach(function(answer) {
      var answerButton = document.createElement('button');
      this.appendText(answerButton, answer);
      containerDiv.appendChild(answerButton);
      answerButton.addEventListener('click', function(){
          this.checkAnswer(answer, question.correctAnswer);
      }.bind(this));
    }.bind(this));
  }
}

module.exports = UI;