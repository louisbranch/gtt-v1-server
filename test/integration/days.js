var assert = require('assert')
  , http = require('http')
  , app = require('../../app.js');

describe('Days integration test', function(){
  var server, token;
  var project = 'test';
  var port = 9999;

  before(function(done){
    server = app.start(port);
    createProject(done);
  });

  after(function(done){
    destroyProject(function () {
      server.close();
      done();
    });
  });

  function createProject(done) {
    http.request({port: port, path: '/projects/' + project, method: 'PUT'},
                 function(res){ parseToken(res, done); }).end();
  }

  function destroyProject(cb) {
    http.request({port: port, path: '/projects/' + project + '?token=' + token, method: 'DELETE'},
                 function(){ cb(); }).end();
  }

  function parseToken(res, done) {
    var str = '';
    res.on('data', function(chunk){
      str += chunk;
    });
    res.on('end', function(){
      token = JSON.parse(str).token;
      done();
    });
  }

  it('passes', function(){
    assert(true);
  });

});
