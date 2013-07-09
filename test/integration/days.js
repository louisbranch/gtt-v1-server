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

  it('adds a commit to a day', function(done){
    var params = {
      message: 'A new commit!',
      type: 'commit',
      branch: 'master',
      end: '10:00'
    };

    helper.request({path: '/days/' + date + '/tasks', method: 'POST', data: params}, function (res) {
      assert(res.ok);
      done();
    });

  });

  it('pauses a day', function(done){
    var params = {
      type: 'pause',
      start: '11:00'
    };

    helper.request({path: '/days/' + date + '/breaks', method: 'POST', data: params}, function (res) {
      assert(res.ok);
      done();
    });
  });

  it('resumes a day', function(done){
    var params = {
      type: 'resume',
      end: '11:30'
    };

    helper.request({path: '/days/' + date + '/breaks', method: 'POST', data: params}, function (res) {
      assert(res.ok);
      done();
    });
  });

  it('adds a task to a day', function(done){
    var params = {
      message: 'A new task!',
      type: 'task',
      end: '12:00'
    };

    helper.request({path: '/days/' + date + '/tasks', method: 'POST', data: params}, function (res) {
      assert(res.ok);
      done();
    });

  });

  it('ends day', function(done){
    helper.request({path: '/days/' + date, method: 'PUT', data: {end: '12:00'}}, function (res) {
      assert(res.ok);
      done();
    });
  });

  it('gets time worked', function(done){
    helper.request({path: '/days/' + date, method: 'GET'}, function (res) {
      assert(res.ok);
      assert.equal(res.message, '02:30 hours worked today');
      done();
    });
  });

});
