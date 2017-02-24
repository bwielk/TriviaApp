var express = require('express');
// var app = express();
var Question = require('../client/src/models/question');
var questionsRouter = express.Router();

var QuestionsQuery = require('../client/db/questionsQuery');
var query = new QuestionsQuery();

questionsRouter.get('/', function(req, res) {
  query.all(function(results) {
    res.json(results);
  });
});

// questionsRouter.post('/', function(req, res){
//   var newQuestion = new Question({
//     question: req.body.question,
//     answer: req.body.answer,
//     options: req.body.options//array?
//   });
// });

// questionsRouter.put('/:id', function(req, res){
//   var updatedQuestion = new Question({
//     question: req.body.question,
//     answer: req.body.answer,
//     options: req.body.options //array?
//   });
//   questions[req.params.id] = updatedQuestion;
//   res.json({data: questions});
// });

// questionsRouter.delete('/:id', function(req, res){
//   questions.splice(req.params.id, 1);
//   res.json({data: questions});
// });




module.exports = questionsRouter;
