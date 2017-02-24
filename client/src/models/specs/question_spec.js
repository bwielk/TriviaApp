var is = require('assert');
var Question = require('../question');

describe("QuestionSpec", function(){

  var question1;
  var question2;

  beforeEach("Setup", function(){
    question1 = new Question({
      questionString: "What's your name?", 
      correctAnswer: "James", 
      possibleAnswers: ["James", "Nina", "Blaise", "Cookie"]
    });
    question2 = new Question({
      questionString: "What's your age?", 
      correctAnswer: "22", 
      possibleAnswers: ["23", "22", "24", "25"]
    });
  });

  it("should have a correct answer", function(){
    is.equal("James", question1.correctAnswer);
  });

  it("should have a question", function(){
    is.equal("What's your name?", question1.questionString);
  });

  it("should have options", function(){
    is.equal("Nina", question1.possibleAnswers[1]);
  });
});

