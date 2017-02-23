var Questions = function() {
}

Questions.prototype = {
  makeRequest: function(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = callback;
    request.send();
  }, 

  all: function(callback) {
    console.log("in all function");
    this.makeRequest('http://localhost:3000/api/questions', function() {
      if (this.status != 200) {
        console.log("status not 200");
        return;
      }
        var jsonString = this.responseText;
        var result = JSON.parse(jsonString);
        callback(result);
    });
  }
};

module.exports = Questions;
