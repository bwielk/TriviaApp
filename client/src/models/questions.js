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
