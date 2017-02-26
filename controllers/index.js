var express = require('express');
var router = express.Router();
var path = require('path');

router.use('/api/questions', require('./questions'));
router.use('/api/players', require('./players'));

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/../client/src/views/index.html'));
});

router.get('/leaderboard', function(req, res) {
  res.sendFile(path.join(__dirname + '/../client/src/views/leaderboard.html'));
});

router.get('/about', function(req, res){
  res.json({data: "Your home for quizzes"});
});

module.exports = router;