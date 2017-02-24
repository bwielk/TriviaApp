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

  // add: function(questionToAdd, onQueryFinished){
  //   MongoClient.connect(this.url, function(err, db){
  //     if(db){
  //       var questions = db.collection('questions');
  //       questions.insert(questionToAdd);
  //       questions.find().toArray(function(err, docs){
  //         onQueryFinished(docs);
  //       });
  //     };
  //   });
  // },

  // update: function(questionToUpdate, onQueryFinished){
  //   MongoClient.connect(this.url, function(err, db){
  //     if(db){
  //       var questions = db.collection('questions');
  //       var toUpdate = questions.find(quesionToUpdate.id);
  //       toUpdate = questions.insert(questionUpdated);
  //       questions.find().toArray(function(err, docs){
  //         onQueryFinished(docs);
  //       });
  //     }
  //   });
  // },

  // delete: function(questionToDelete, onQueryFinished){
  //   MongoClient.connect(this.url, function(eer,db){
  //     if(db){
  //       var questions = db.collection('questions');
  //       questions.remove(questionToDelete);
  //       questions.find().toArray(function(err, docs){
  //         onQueryFinished(docs);
  //       });
  //     }
  //   });
  // }


}

module.exports = QuestionsQuery;