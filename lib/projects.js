var dbServer = require('./db').dbServer;

exports.use = function(id){
  return dbServer.use(id);
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
