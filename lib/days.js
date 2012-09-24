var projects = require('./projects');

exports.createDay = function(id, date, time, callback){
  var project = projects.use(id);
  insert(project, {started: time}, date, callback);
};

exports.finishDay = function(id, date, time, callback){
  var project = projects.use(id);
  project.get(date, {}, function(err, day){
    if (err) {
      callback({error: true, message: err.message});
    } else {
      day.ended = time;
      insert(project, day, {}, callback);
    }
  });
};

var insert = function(project, params, date, callback){
  project.insert(params, date, function(err, body){
    if (err) {
      callback({error: true, message: err.message});
    } else {
      callback({ok: true});
    }
  });
};
