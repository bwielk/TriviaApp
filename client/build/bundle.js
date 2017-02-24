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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Questions = __webpack_require__(1);

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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/user/Documents/week13/trivial/TriviaApp/client/src/models/questions.js Unexpected token (12:0)\nYou may need an appropriate loader to handle this file type.\n|   }, \n| \n| <<<<<<< HEAD\n|   makePostRequest: function(url, callback, entryData) {\n|     var request = new XMLHttpRequest();");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var UI = __webpack_require__(0);
var welcomeUI = __webpack_require__(3);

var welcome = function() {
  new welcomeUI();
}

var app = function() {
  new UI();
}

window.onload = welcome;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var UI = __webpack_require__(0);


var welcomeUI = function() {
  this.createWelcomeText();
  this.createPlayButton();
}

welcomeUI.prototype = {
  createWelcomeText: function() {
    var welcomeText = document.createElement('p');
    welcomeText.innerText = "This is a game";
    var div = document.getElementById('main')
    div.appendChild(welcomeText);
  }, 

  handleButtonClick: function() {
    new UI();
  },

  createPlayButton: function() {
    var playButton = document.createElement('button');
    playButton.innerText = "PLAY";
    var div = document.getElementById('main')
    div.appendChild(playButton);
    playButton.onclick = this.handleButtonClick;
  }

}

module.exports = welcomeUI;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map