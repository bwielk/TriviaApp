var Questions = require('../models/questions');

var Player = require('../models/player')

var Player = require('../models/player');
var CorrectSound = require('../models/correctSound');
var WrongSound = require('../models/wrongSound');
var gameOverUI = require('./gameOverUI.js');


var currentPlayer;
var questionsArray;
var questionIndex;


var gameUI = function() {
  var questions = new Questions();
  this.wrongAnswerButtons = [];
  this.correctAnswerButton;
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
      lives: 3, 
      lifePreserver5050: true, 
      lifePreserverGiveHint: true
    };
    this.savePlayer(currentPlayer);
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
    this.wrongAnswerButtons = [];
    question.possibleAnswers.forEach(function(answer) {
      var answerButton = document.createElement('button');
      this.appendText(answerButton, answer);
      containerDiv.appendChild(answerButton);
      if (answer === question.correctAnswer) {
        this.correctAnswerButton = answerButton;
      } else {
        this.wrongAnswerButtons.push(answerButton);

      }
      answerButton.addEventListener('click', function(){
        this.checkAnswer(answer, question.correctAnswer);
      }.bind(this));
    }.bind(this));
  },

  removeTwoAnswers: function() {
    if (this.wrongAnswerButtons.length === 3) {
      var randomIndex = Math.floor(Math.random() * (3));
      this.wrongAnswerButtons.splice(randomIndex, 1);
      this.wrongAnswerButtons.forEach(function(answerButton) {

        answerButton.disabled = true;

      }.bind(this));
      currentPlayer.lifePreserver5050 = false;
      this.savePlayer(currentPlayer);
    }
  },

  render5050LifePreserver: function() {
    if (currentPlayer.lifePreserver5050) {
      var containerDiv = document.getElementById('question');
      var button5050 = document.createElement('button');
      this.appendText(button5050, "50/50");
      containerDiv.appendChild(button5050);
      button5050.onclick = this.removeTwoAnswers.bind(this);
    }
  },

  giveHint: function() {
    if (this.wrongAnswerButtons.length === 3) {

      var hintedButton;
      var randomNumber0to4 = Math.floor(Math.random() * 5);

      //give the correct answer 80% of the time
      if (randomNumber0to4 === 4) {
        var randomIndex = Math.floor(Math.random() * 3);
        hintedButton = this.wrongAnswerButtons[randomIndex];
      } else {
        hintedButton = this.correctAnswerButton;
      }

      hintedButton.style.cssText = "font-weight: bold";
      currentPlayer.lifePreserverGiveHint = false; 
      console.log(currentPlayer);
      this.savePlayer(currentPlayer);
    }
  },

  renderHintLifePreserver: function() {
    if (currentPlayer.lifePreserverGiveHint) {
      console.log("test");
      var containerDiv = document.getElementById('question');
      var buttonHint = document.createElement('button');
      this.appendText(buttonHint, "Get Hint");
      containerDiv.appendChild(buttonHint);
      buttonHint.onclick = this.giveHint.bind(this);
    }
  },

  render: function(question) {
    if (questionIndex < questionsArray.length) {
      var containerDiv = document.getElementById('question');
      var p = document.createElement('p');
      this.appendText(p, question.questionString)
      containerDiv.appendChild(p);
      this.renderButtons(question);
      this.render5050LifePreserver();
      this.renderHintLifePreserver();
    }
  }
}

module.exports = gameUI;