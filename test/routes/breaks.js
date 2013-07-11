var assert = require('assert');
var breaks = require('../../lib/breaks');
var sinon = require('sinon');

var route = require('../../routes/breaks');

describe('breaks routes', function(){

  describe('.create', function(){
    var req, res;

    afterEach(function(){
      breaks.create.restore();
    });

    it('calls break create with request data', function(){
      var id = 'test', date = '2013-09-10', body = {start: '11:00'};
      var spy = sinon.spy(breaks, 'create');
      req = {params: {id: id, date: date}, body: body};

      route.create(req, res);
      assert(breaks.create.calledWith(id, body, date));
    });

    it('sends the breaks response to the request', function(){
      res = {send: sinon.spy()};
      sinon.stub(breaks, 'create', function (id, params, date, cb) {
        cb('message');
      });
      route.create(req, res);
      assert(res.send.calledWith('message'));
    });

  });

});
