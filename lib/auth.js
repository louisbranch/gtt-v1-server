var projects = require('./projects');

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
