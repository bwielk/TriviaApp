var express = require('express');

var Question = require('../client/src/models/question');
var questionsRouter = express.Router();

var QuestionsQuery = require('../client/db/questionsQuery');
var query = new QuestionsQuery();

questionsRouter.get('/', function(req, res) {
  query.all(function(results) {
    res.json(results);
  });
});

questionsRouter.get('/:id', function(req, res) {
  query.all(function(results) {
    res.json(results[req.params.id]);
  });
});

questionsRouter.post('/', function(req, res){
  var newQuestion = new Question({
    questionString: req.body.questionString,
    correctAnswer: req.body.correctAnswer,
    category: req.body.category,
    possibleAnswers: req.body.possibleAnswers//array?
  });
  query.add(newQuestion,function(results){ //NEW
    res.json(results);
  });
});

questionsRouter.put('/:id', function(req, res){
  var updatedQuestion = new Question({
    questionString: req.body.questionString,
    correctAnswer: req.body.correctAnswer,
    category: req.body.category,
    possibleAnswers: req.body.possibleAnswers //array?
  });

  query.all(function(results) {
    var questionToUpdate = results[req.params.id];
    query.update( questionToUpdate, updatedQuestion, function(results2) {
      res.json(results2);
    });  
  });

});

questionsRouter.delete('/:id', function(req, res){
  // questions.splice(req.params.id, 1);
  query.all(function(results) {
    var questionObject = results[req.params.id];
    query.delete( questionObject, function(results2) {
      res.json(results2);
    });  
  });
});

module.exports = questionsRouter;
