
var Questions = require('../models/questions');

var Player = require('../models/player')

var Player = require('../models/player');
var CorrectSound = require('../models/correctSound');
var WrongSound = require('../models/wrongSound');
var FiftySound = require('../models/fiftySound');
var HintSound = require('../models/hintSound');
var gameOverUI = require('./gameOverUI.js');


var currentPlayer;
var questionsArray;
var questionIndex;
var timerBar;
var timer;
var timerInterval;


var gameUI = function() {
  var welcome = document.getElementById('welcome_content');
  var buttonsField = document.getElementById('buttons');
  buttonsField.style.width = "472px";
  this.createGoBackButton(buttonsField);
  welcome.style = "display: none";
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

  removeContent: function(htmlElementId) {
    var toClear = document.getElementById(htmlElementId);
    while (toClear.firstChild) {
        toClear.removeChild(toClear.firstChild);
    }
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

  handleGoBackButtonClick: function(){
    window.location = "/";
  },

  createGoBackButton: function(container){
    var goBackButton = document.createElement("button");
    goBackButton.innerText = "GO BACK";
    goBackButton.id = "buttonUI";
    container.appendChild(goBackButton);
    goBackButton.onclick = this.handleGoBackButtonClick;
  },

  checkAnswer: function(selectedAnswer, correctAnswer, answerButton) {
    this.correctAnswerButton.style.cssText = "background-color: green;";
    if (selectedAnswer === correctAnswer) {
      console.log("correct");
      currentPlayer.score += timer;
      this.savePlayer(currentPlayer);
      var correctSound = new CorrectSound();
    } else {
      this.wrongAnswerButtons.forEach(function(button) {
        console.log(button.innerText);
        console.log(correctAnswer);
          answerButton.style.cssText = "background-color: red;";
      });
      var wrongSound = new WrongSound();
      currentPlayer.lives -= 1;
      this.savePlayer(currentPlayer);
      console.log("incorrect");
    }
    setTimeout(this.endOfQuestion.bind(this), 1000);
  },

  endOfQuestion: function() {
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
    var containerDiv = document.getElementById('choices');
    this.wrongAnswerButtons = [];
    question.possibleAnswers.forEach(function(answer) {
      var answerButton = document.createElement('button');
      answerButton.id = "buttonOptions";
      this.appendText(answerButton, answer);
      containerDiv.appendChild(answerButton);
      if (answer === question.correctAnswer) {
        this.correctAnswerButton = answerButton;
      } else {
        this.wrongAnswerButtons.push(answerButton);
      }
      answerButton.addEventListener('click', function(){
        // console.log(answerButton);
        this.checkAnswer(answer, question.correctAnswer, answerButton);
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
      var fiftySound = new FiftySound();
      currentPlayer.lifePreserver5050 = false;
      this.savePlayer(currentPlayer);
    }
  },

  render5050LifePreserver: function() {
    if (currentPlayer.lifePreserver5050) {
      var containerDiv = document.getElementById('question');
      var button5050 = document.createElement('button');
      button5050.id = "buttonGameHints";
      button5050.style.cssText = "background-color: pink; color: black";
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
      var hintSound = new HintSound();
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
      buttonHint.id = "buttonGameHints";
      buttonHint.style.cssText = "background-color: powderblue; color: black";
      this.appendText(buttonHint, "Get Hint");
      containerDiv.appendChild(buttonHint);
      buttonHint.onclick = this.giveHint.bind(this);
    }
  },

  timeOut: function() {
    questionIndex += 1;
    this.removeQuestion();
    this.render(questionsArray[questionIndex]);
  },

  moveTimer: function() {
    if (timer > 0) {
      timer -= 0.5;
      timerBar.style.width = timer + '%';
      if (timer < 50) {
        timerBar.style.backgroundColor = 'orange';
      }
      if (timer < 25) {
        timerBar.style.backgroundColor = 'red';
      }
    } else if (timer === 0) {
      currentPlayer.lives -= 1;
      setTimeout(this.endOfQuestion.bind(this), 1000);
      clearInterval(timerInterval);
    }
  },

  renderTimerBar: function() {
    timer = 100;
    console.log("rendering progress bar");
    var containerDiv = document.getElementById('question');
    var progressBarBackground = document.createElement('div');
    timerBar = document.createElement('div');
    progressBarBackground.appendChild(timerBar);
    containerDiv.appendChild(progressBarBackground);
    progressBarBackground.style.cssText = "background-color: grey; width: 100%; height: 20px";
    timerBar.style.cssText = "height: 20px; width: 100%; background-color: green;"
    clearInterval(timerInterval);
    timerInterval = setInterval(this.moveTimer.bind(this), 50);
  },

  render: function(question) {   
    if (questionIndex < questionsArray.length) {
      var containerDiv = document.getElementById('question');
      var p = document.createElement('p');

      this.appendText(p, question.questionString);
      containerDiv.appendChild(p);
    
      this.renderTimerBar();
      this.render5050LifePreserver();
      this.renderHintLifePreserver();
      this.renderButtons(question);
    }
  }
}

module.exports = gameUI;