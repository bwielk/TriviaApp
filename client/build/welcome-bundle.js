/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Players = __webpack_require__(1);

var leaderboardUI = function(){
  this.removeContent("quiz");
  this.removeContent("main");
  this.createGoBackButton();
  var players = new Players();
  players.all(function(result){
    this.render(result);
  }.bind(this));
};

leaderboardUI.prototype = {
  removeContent: function(htmlElementId) {
    var toClear = document.getElementById(htmlElementId);
    while (toClear.firstChild) {
        toClear.removeChild(toClear.firstChild);
    }
  }, 

  render: function(players){
    var maindiv = document.getElementById('main');
    var list = document.createElement('ol');
    var sortedArray = players.sort(function(a, b){
      return a.scores - b.scores;
    }).reverse();
    for(var player of sortedArray){
      var li = document.createElement('li');
      li.innerText = "NAME: " + player.name + " \n SCORES(total): " + player.scores + "";
      list.appendChild(li);
    }
    maindiv.appendChild(list);
  },

  handleGoBackButtonClick: function(){
    window.location = "/";
  },

  createGoBackButton: function(){
    var container = document.getElementById("main");
    var goBackButton = document.createElement("button");
    goBackButton.innerText = "GO BACK";
    container.appendChild(goBackButton);
    goBackButton.onclick = this.handleGoBackButtonClick;
  }
}


module.exports = leaderboardUI;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var Players = function(){};

Players.prototype = {
  makeRequest: function(url, callback){
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = callback;
    request.send();
  },

  all: function(callback){
    this.makeRequest('http://localhost:3000/api/players', function(){
      if(this.status !== 200) return;
      var jsonString = this.responseText;
      var result = JSON.parse(jsonString);
      callback(result);
    });
  },

  makePostRequest: function(url, callback, entryData) {
    var request = new XMLHttpRequest();
    request.open("POST", url);//we request the POST connection
    request.setRequestHeader("Content-type", "application/json");//hey api, the POSTed file is in JSON
    request.onload = callback;
    request.send(entryData);
  },

  makePutRequest: function(url, callback, entryData){
    request.open("PUT", url);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = callback;
    request.send(entryData);
  },

  makeDeleteRequest: function(url, callback){
    request.open("DELETE", url);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = callback;
    request.send();
  },
}

module.exports = Players;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var Player = function(options){
  this.name = options.name;
  this.password = options.password;
  this.scores = options.scores;
};

module.exports = Player;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


var Questions = __webpack_require__(6);

var Player = __webpack_require__(2)

var Player = __webpack_require__(2);
var CorrectSound = __webpack_require__(4);
var WrongSound = __webpack_require__(7);
var gameOverUI = __webpack_require__(8);


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

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var CorrectSound = function(){

  var correctSound = new Audio('https://www.soundjay.com/button/sounds/button-3.mp3');
  correctSound.play();
};

  

module.exports = CorrectSound;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

var GameOverSound = function(){

  var gameOverSound = new Audio('http://themushroomkingdom.net/sounds/wav/smb/smb_mariodie.wav');
  gameOverSound.play();
};

  

module.exports = GameOverSound;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var Questions = function() {
}

Questions.prototype = {
  makeRequest: function(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = callback;
    request.send();
  }, 

  makePostRequest: function(url, callback, entryData) {
    var request = new XMLHttpRequest();
    request.open("POST", url);//we request the POST connection
    request.setRequestHeader("Content-type", "application/json");//hey api, the POSTed file is in JSON
    request.onload = callback;
    request.send(entryData);
  },

  makePutRequest: function(url, callback, entryData){
    request.open("PUT", url);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = callback;
    request.send(entryData);
  },

  // makePostRequest: function(url, callback, entryData) {
  //   var request = new XMLHttpRequest();
  //   request.open("POST", url);//we request the POST connection
  //   request.setRequestHeader("Content-type", "application/json");//hey api, the POSTed file is in JSON
  //   request.onload = callback;
  //   request.send(entryData);
  // },

  // /////////////////////TO BE CHECKED/////////////////////////////////////////////////
  // makePutRequest: function(url, callback, entryData){
  //   request.open("PUT", url);
  //   request.setRequestHeader("Content-type", "application/json");
  //   request.onload = callback;
  //   request.send(entryData);
  // },

  makeDeleteRequest: function(url, callback){
    var request = new XMLHttpRequest();
    request.open("DELETE", url);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = callback;
    request.send();
  },

  all: function(callback) {
    this.makeRequest('http://localhost:3000/api/questions', function() {
      if (this.status != 200) return;
        var jsonString = this.responseText;
        var result = JSON.parse(jsonString);
        callback(result);
    });
  },

  add: function(newQuestion, callback){
    var questionToAdd = JSON.stringify(newQuestion);
    this.makePostRequest('http://localhost:3000/api/questions', callback, questionToAdd);
  },

  // update: function(question, callback){
  //   var questionUpdate = JSON.stringify(question);
  //   this.makePutRequest('http//localhost:3000/api/questions', questionUpdate, callback);
  // },

  delete: function(question, callback){
    this.makeDeleteRequest("http//localhost:3000/api/questions", question, callback);
  }

  ///////////////////
}

module.exports = Questions;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var WrongSound = function(){

  var wrongSound = new Audio('https://www.soundjay.com/button/sounds/beep-05.mp3');
  wrongSound.play();
};

module.exports = WrongSound;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var leaderboardUI = __webpack_require__(0);
var GameOverSound = __webpack_require__(5);



var gameOverUI = function() {
  this.stringified = localStorage.getItem("currentPlayer");
  this.currentPlayer = JSON.parse(this.stringified);
  this.currentPlayerName = this.currentPlayer.name;
  this.currentPlayerScore = this.currentPlayer.score;
  this.container = document.getElementById('main');
  this.setup(); 
}

gameOverUI.prototype = {

  setup: function() {
    this.removeContent("main");
    this.removeContent("question");
    this.changeTitle();
    this.createOutcomeText();
    this.createLeaderboardButton();
    this.createStartNewGameButton();
    setTimeout(GameOverSound, 800);
  },

  showLeaderboard: function() {
    new leaderboardUI();
  },

  changeTitle: function() {
    var title = document.getElementsByTagName('title');
    title.innerText = "GAME OVER";
  },

  removeContent: function(htmlElementId) {
    var toClear = document.getElementById(htmlElementId);
    while (toClear.firstChild) {
        toClear.removeChild(toClear.firstChild);
    }
  }, 

  createOutcomeText: function() {
    var textField = document.createElement('h2');
    console.log(this.currentPlayer);
    textField.innerText = "You score " + this.currentPlayerScore;
    this.container.appendChild(textField);
  },

  createForm: function() {
    var form = document.createElement('form');
    form.action = "/api/players/";
    form.method = "post";
    this.container.appendChild(form);
    return form;
  },

  addInput: function(form, inputType, inputName, inputValue) {
    var input = document.createElement("input");
    input.type = inputType;
    input.name = inputName;
    input.value = inputValue;
    form.appendChild(input);
  },

  createLeaderboardButton: function() {
    var form = this.createForm();
    this.addInput(form, "text", "name", "Input Name");
    this.addInput(form, "hidden", "scores", this.currentPlayerScore);

    var submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Save to leaderboard";
    form.appendChild(submit);
  },

  handleNewGameButtonClick: function() {
    location.reload();

  },

 createStartNewGameButton: function(){
   var startNewGameButton = document.createElement('button');
   startNewGameButton.innerText = "Start New Game";
   var div = document.getElementById('main');
   div.appendChild(startNewGameButton);
   startNewGameButton.onclick = this.handleNewGameButtonClick;
 },

}

module.exports = gameOverUI;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var gameUI = __webpack_require__(3);

var app = function() {
  new gameUI();
}

window.onload = app;

/***/ })
/******/ ]);
//# sourceMappingURL=welcome-bundle.js.map