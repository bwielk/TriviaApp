var Question = function(options){
  this.questionString = options.questionString;
  this.correctAnswer = options.correctAnswer;
  this.category = options.category;
  this.possibleAnswers = options.possibleAnswers;
};


module.exports = Question;
