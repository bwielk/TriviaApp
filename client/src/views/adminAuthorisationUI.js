
var adminAuthorisationUI = function(){
  var inputField = document.createElement('input');
  this.createEnterButton(inputField);
}

adminAuthorisationUI.prototype = {
  handleEnterButton: function(){

  },

  createEnterButton: function(inputField){
    var button = document.createElement('button');
    button.innerText = "GO";
    button.onclick = this.handleEnterButton(inputField);
  }
}


module.exports = adminAuthorisationUI;