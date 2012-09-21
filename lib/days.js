var projects = require('./projects');

exports.createDay = function(id, date, time, callback){
  projects.getProject(id, function(err, project){
    if (err) {
      callback(err);
    } else {
      startDay(project, date, time, callback);
    }
  });
};

exports.finishDay = function(){};

var startDay = function(project, date, time, callback){
  project.insert({started: time}, date, function(err, body){
    if (!err) {
      callback({ok: true});
    }
  });
};
