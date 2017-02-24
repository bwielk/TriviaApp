var Players = function(){};

Players.prototype = {
  makeRequest: function(url, callback){
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = callback;
    request.close();
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