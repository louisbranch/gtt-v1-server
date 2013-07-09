var assert = require('assert')
  , helper = require('../helper.js');

describe('Days integration test', function(){

  before(function(done){
    helper.startServer({withProject: true}, done);
  });

  after(function(done){
    helper.stopServer({withProject: true}, done);
  });

  it('passes', function(){
    assert(true);
  });

});
