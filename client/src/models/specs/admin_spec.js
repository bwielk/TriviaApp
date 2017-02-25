var is = require('assert');
var Admin = require('../admin.js');

describe("AdminSpec", function(){

  var admin1;

  beforeEach("Setup", function(){
    admin1 = new Admin();
  });

  it("should have password", function(){
    is.equal("123abc", admin1.password);
  });
});
