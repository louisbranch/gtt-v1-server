var db = require('./db');
var days = require('./days');
var breaks = require('./breaks');

module.exports = {
  create: create
};

function create(id, params, date, callback){
  var project = db.use(id);
  days.get(project, date, function(err, day){
    if (err) {
      return callback({error: true, message: "Day hasn't been started yet!" });
    }
    add(project, params, day, callback);
  });
}

function add(project, params, day, callback){
  var paused = breaks.isPaused(day);
  if (paused) {
    return callback({error: true, message: 'Day has been paused!'});
  } else if (day.end) {
    return callback({error: true, message: 'Day already over!'});
  } else {
    var task = filter(params);
    day.tasks.push(task);
    days.insert(project, day, null, callback);
  }
}

function filter(params){
  var allowedFields = ['end', 'message', 'branch'];
  var filteredParams = {};
  for (var i=0; i < allowedFields.length; i++) {
    var attr = allowedFields[i];
    if (params[attr]) {
      filteredParams[attr] = params[attr];
    }
  }
  return filteredParams;
}
