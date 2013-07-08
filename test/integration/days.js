var assert = require('assert')
  , http = require('http')
  , app = require('../../app.js');

describe('Days integration test', function(){
  var server;

  function url() {
    var project = 'test';
    var token = '96b39ae799ee8daf774ca1e47da2d8df228e070a';
    var day = '2013-06-03';
    return 'http://localhost:9999/projects/' + project + '/days/' + day +  '?token=' + token;
  }

  before(function(done){
    server = app.start('9999');
    done();
  });

  after(function(done){
    server.close();
    done();
  });

  describe('day status', function(){

    it('receives time worked', function(done){
      var data = '';

      http.get(url(), function(res){
        assert.equal(res.statusCode, 200);
        res.on('data', parseRes);
      });

      function parseRes(chunk) {
        data += chunk;
        assert.equal(JSON.parse(data).message, '08:10 hours worked today');
        done();
      }

    });

  });
});
