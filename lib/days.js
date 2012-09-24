var projects = require('./projects');

exports.createDay = function(id, date, time, callback){
  project = projects.use(id);
  project.insert({started: time}, date, function(err, body){
    if (err) {
      callback({error: true, message: err.message});
    } else {
      callback({ok: true});
    }
  });
};

exports.finishDay = function(id, date, time, callback){
  projects.getProject(id, callback, function(project){
    // Finish
  });
};
