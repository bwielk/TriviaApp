var MongoClient = require('mongodb').MongoClient;

var QuestionsQuery = function(){
  this.url = 'mongodb://localhost:27017/trivia';
}

QuestionsQuery.prototype = {
  all: function(onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      var questions = db.collection('questions');
      questions.find().toArray(function(err, docs){
        onQueryFinished(docs);
      });
    });
  },

  add: function(questionToAdd, onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if(db){
        var questions = db.collection('questions');
        questions.insert(questionToAdd);
        questions.find().toArray(function(err, docs){
          onQueryFinished(docs);
        });
      };
    });
  },

  update: function(questionToUpdate, updatedQuestion, onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if(db){
        var questions = db.collection('questions');
        console.log("in update funciton");
        questions.update(questionToUpdate, {$set: updatedQuestion});
        questions.find().toArray(function(err, docs){
          onQueryFinished(docs);
        });
      }
    });
  },

  delete: function(questionToRemove, onQueryFinished){
    MongoClient.connect(this.url, function(err,db){
      if(db){
        var questions = db.collection('questions');
        questions.remove(questionToRemove, true);
        questions.find().toArray(function(err, docs){
          onQueryFinished(docs);
        });
      }
    });
  }


}

module.exports = QuestionsQuery;