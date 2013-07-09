var db = require('./db');
var crypto = require('crypto');

module.exports = {
  generate: generate,
  validate: validate
};

function generate(id) {
  var shasum = crypto.createHash('sha1');
  shasum.update(id + new Date());
  return shasum.digest('hex');
}

function validate(id, reqToken, callback){
  get(id, function(err, token){
    if (err) {
      return callback({error: true, message: 'Token not found!'})
    }
    if (token === reqToken) {
      callback(null, {ok: true});
    } else {
      callback({error: true, message: 'Authorization failed!'})
    }
  });
}

function get(id, callback){
  var project = db.use(id);
  project.get('info', {}, function(err, info){
    callback(err, info.credentials);
  });
}
