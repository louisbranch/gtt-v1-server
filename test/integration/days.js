var assert = require('assert')
  , helper = require('../helper.js');

describe('Days integration test', function(){
  var date = '2013-07-08';

  before(function(done){
    helper.startServer({withProject: true}, done);
  });

  after(function(done){
    helper.stopServer({withProject: true}, done);
  });

  it('starts a day', function(done){
    helper.request({path: '/days/' + date, method: 'PUT', data: {start: '09:00'}}, function (res) {
      assert(res.ok);
      done();
    });
  });

});
