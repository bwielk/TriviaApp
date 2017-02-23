var is = require('assert');
var Question = require('../question');

describe("QuestionSpec", function(){

  var question1;
  var question2;

  beforeEach("Setup", function(){
    question1 = new Question("What's your name?", "James", ["James", "Nina", "Blaise", "Cookie"]);
    question2 = new Question("What's your age?", "22", ["23", "22", "24", "25"]);
  });

  it("should have a correct answer", function(){
    is.equal("James", question1.answer);
  });

  it("should have a question", function(){
    is.equal("What's your name?", question1.question);
  });

  it("should have options", function(){
    is.equal("Nina", question1.options[1]);
  });
});

