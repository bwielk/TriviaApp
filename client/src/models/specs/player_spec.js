var is = require('assert');
var Player = require('../player');

describe("PlayerSpec", function(){

  var player1;

  beforeEach("Setup", function(){
    player1 = new Player({
      name: "NinaK",
      password: "nina",
      scores: 12
    });
  });

  it("should have a name", function(){
    is.equal("NinaK", player1.name);
  });

  it("should have password", function(){
    is.equal("nina", player1.password);
  });

  it("should have scores", function(){
    is.equal(12, player1.scores);
  });
});