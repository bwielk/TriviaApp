var express = require('express');
var router = express.Router();
var path = require('path');

router.use('/api/quiz', require('./quiz'));

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/../client/src/views/index.html'));
});

router.get('about', function(req, res){
  res.json({data: "Your home for quizzes"});
})

module.exports = router;