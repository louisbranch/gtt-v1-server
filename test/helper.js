var http = require('http')
  , qs = require('querystring')
  , app = require('../app.js');

var server, token;
var project = 'test';
var port = 9999;

module.exports = {
  request: request,
  startServer: startServer,
  stopServer: stopServer
}

function request(opts, cb) {
  opts = opts || {};
  opts.path = opts.path || '';
  opts.headers = opts.headers || {};

  var data = '';
  if (opts.data) {
    data = qs.stringify(opts.data);
    opts.headers = {'Content-Type': 'application/x-www-form-urlencoded',  'Content-Length': data.length};
  }

  req = http.request({port: port, path: '/projects/' + project + opts.path  + '?token=' + token, method: opts.method, headers: opts.headers},
                     function(res){ parse(res, cb); });
  req.end(data);
}

function startServer(opts, done) {
  server = app.start(port);
  createProject(done);
}

function stopServer(opts, done) {
  destroyProject(function () {
    server.close();
    done();
  });
}

function createProject(done) {
  http.request({port: port, path: '/projects/' + project, method: 'PUT'},
  function(res){
    parse(res, function(data) {
      token = data.token;
      done();
    });
  }).end();
}

function destroyProject(cb) {
  request({method: 'DELETE'}, cb);
}

function parse(res, cb) {
  var str = '';
  res.on('data', function(chunk){
    str += chunk;
  });
  res.on('end', function(){
    var response = JSON.parse(str);
    cb(response);
  });
}
