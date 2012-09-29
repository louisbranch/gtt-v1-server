var dbServer = require('./db').dbServer;

var use = function(id){
  return dbServer.use(id);
};
exports.use = use;

exports.createProject = function(id, callback){
  dbServer.db.create(id, function(err, body){
    if (err) {
      callback({error: true, message: 'Project already exists'});
    } else {
      createToken(id, callback);
    }
  });
};

var createToken = function(id, callback){
  var project = use(id);
  var token = 'token'
  project.insert({credentials: token}, 'info', function(err, body){
    if (err) {
      callback({error: true, message: "Credentials couldn't be set!"});
    } else {
      callback({ok: true, token: token});
    }
  });
};
