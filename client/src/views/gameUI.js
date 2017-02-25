var Questions = require('../models/questions');
var Player = require('../models/player');
var CorrectSound = require('../models/correctSound');
var WrongSound = require('../models/wrongSound');
var gameOverUI = require('./gameOverUI.js');

///test comment

var currentPlayer;
var questionsArray;
var questionIndex;


var gameUI = function() {
  var questions = new Questions();
  questions.all(function(result) {
    questionsArray = result;
    questionIndex = 0;
    this.render(questionsArray[questionIndex]);
  }.bind(this));
  this.setupPlayer();
}

gameUI.prototype = {
  createText: function(text) {
    var p = document.createElement('p');
    p.innerText = text;
    return p;
  },

  endGame: function() {
    new gameOverUI();
  },

  setupPlayer: function() {
    currentPlayer = {
      name: "New Player", 
      score: 0, 
      lives: 3
    };
    this.savePlayer(currentPlayer);
    // var currentSavedPlayer = localStorage.getItem("currentPlayer");
    // if (!currentSavedPlayer) {
    //   currentPlayer = {
    //     name: "Test Player", 
    //     score: 0
    //   };
    //   this.savePlayer(currentPlayer);
    // } else {
    //   currentPlayer = JSON.parse(currentSavedPlayer);
    // }
  },

  appendText: function(element, text) {
    var pTag = this.createText(text);
    element.appendChild(pTag);
  }, 

  savePlayer: function(playerObject) {
    var dataToSave = JSON.stringify(playerObject);
    localStorage.setItem("currentPlayer", dataToSave);
  },

  checkAnswer: function(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
      console.log("correct");
      currentPlayer.score += 1;
      this.savePlayer(currentPlayer);
      var correctSound = new CorrectSound();
    } else {
      var wrongSound = new WrongSound();
      currentPlayer.lives -= 1;
      this.savePlayer(currentPlayer);
      console.log("incorrect");
    }

    if (currentPlayer.lives == 0) {
      this.endGame();
    } else {

      questionIndex += 1;
      this.removeQuestion();
      this.render(questionsArray[questionIndex]);
    }
  },

  removeQuestion: function() {
    var divToRemove = document.getElementById("question");
    while (divToRemove.firstChild) {
        divToRemove.removeChild(divToRemove.firstChild);
    }
  },

  renderButtons: function(question) {
    var containerDiv = document.getElementById('question');
    question.possibleAnswers.forEach(function(answer) {
      var answerButton = document.createElement('button');
      this.appendText(answerButton, answer);
      containerDiv.appendChild(answerButton);
      answerButton.addEventListener('click', function(){
          this.checkAnswer(answer, question.correctAnswer);
      }.bind(this));
    }.bind(this));
  },

  render: function(question) {
    if (questionIndex < questionsArray.length) {
      var containerDiv = document.getElementById('question');
      var p = document.createElement('p');
      this.appendText(p, question.questionString)
      containerDiv.appendChild(p);
      this.renderButtons(question);
    }
  }
}

module.exports = gameUI;