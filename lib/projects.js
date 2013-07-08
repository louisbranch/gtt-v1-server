var dbServer = require('./db');
var auth = require('./auth');

module.exports = {
  use: use,
  create: create,
  destroy: destroy
};

function use(id) {
  return dbServer.use(id);
}

function create(id, callback) {
  dbServer.db.create(id, function(err, body){
    if (err) {
      callback({error: true, message: 'Project already exists'});
    } else {
      token(id, callback);
    }
  });
}

function destroy(id, callback) {
  dbServer.db.destroy(id, function(err, body){
    if (err) {
      callback({error: true, message: 'Project doesn\'t exist'});
    } else {
      callback({ok: true});
    }
  });
}

function token(id, callback) {
  var project = use(id);
  var token = auth.newToken(id);
  project.insert({credentials: token}, 'info', function(err, body){
    if (err) {
      callback({error: true, message: "Credentials couldn't be set!"});
    } else {
      callback({ok: true, token: token});
    }
  });
}
