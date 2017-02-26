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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ({

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {


var registrationUI = __webpack_require__(4);

var leaderboard = function() {
  new leaderboardUI();
}

window.onload = leaderboard;

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

var Players = __webpack_require__(9);

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

/***/ 9:
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

/***/ })

/******/ });
//# sourceMappingURL=account-bundle.js.map