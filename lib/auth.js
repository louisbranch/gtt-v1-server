var projects = require('./projects');
var crypto = require('crypto');

exports.validateCredentials = function(id, reqToken, callback){
  getToken(id, function(err, token){
    if (err) {
      return callback({error: true, message: 'Token not found!'})
    }
    if (token === reqToken) {
      callback(null, {ok: true});
    } else {
      callback({error: true, message: 'Authorization failed!'})
    }
  });
};

var getToken = function(id, callback){
  var project = projects.use(id);
  project.get('info', {}, function(err, info){
    callback(err, info.credentials);
  });
};

exports.newToken = function(id){
  var shasum = crypto.createHash('sha1');
  shasum.update(id + new Date());
  return shasum.digest('hex');
};
