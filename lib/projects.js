var dbServer = require('./db');
var auth = require('./auth');

module.exports = {
  create: create,
  destroy: destroy
};

function create(id, callback) {
  dbServer.db.create(id, function(err, body){
    if (err) {
      callback({error: true, message: 'Project already exists'});
    } else {
      setToken(id, callback);
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

function setToken(id, callback) {
  var project = dbServer.use(id);
  var token = auth.generate(id);
  project.insert({credentials: token}, 'info', function(err, body){
    if (err) {
      callback({error: true, message: "Credentials couldn't be set!"});
    } else {
      callback({ok: true, token: token});
    }
  });
}
