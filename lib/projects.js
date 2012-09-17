var dbServer = require('./db').dbServer;

exports.getProject = function(id){
  var projects = dbServer.db.use('projects');
  projects.get(id, function(err, body){
    if (err) {
      console.log(err.message);
    } else {
      return body;
    }
  });
};

exports.createProject = function(callback){
  var projects = dbServer.db.use('projects');
  return projects.insert({months: []}, null, function(err, body, header){
    if (err) {
      console.log(err.message);
    } else {
      callback(body);
    }
  });
};
