var dbServer = require('./db').dbServer;

exports.getProject = function(id, callback){
  dbServer.db.get(id, function(err, body){
    if (err) {
      callback({error: true, message: 'Project not found'});
    } else {
      callback(null, dbServer.db.use(id));
    }
  });
};

exports.createProject = function(id, callback){
  dbServer.db.create(id, function(err, body){
    if (err) {
      callback({error: true, message: 'Project already exists'});
    } else {
      callback({ok: true});
    }
  });
};
