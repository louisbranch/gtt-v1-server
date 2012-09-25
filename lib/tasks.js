var projects = require('./projects');
var days = require('./days');

exports.create = function(id, params, date, callback){
  var project = projects.use(id);
  days.get(project, date, function(err, day){
    if (err) {
      return callback({error: true, message: err.message });
    }
    add(project, params, day, callback);
  });
};

var add = function(project, params, day, callback){
  var task = filter(params);
  if (day.end) {
    return callback({error: true, message: 'Day already over!'})
  }
  var status = valid(day, task);
  if (status.error) {
    callback(status);
  } else {
    day.tasks.push(task);
    days.insert(project, day, null, callback);
  }
};

var filter = function(params){
  var allowedFields = ['time', 'type', 'message', 'branch'];
  var filteredParams = {};
  for (var i=0; i < allowedFields.length; i++) {
    var attr = allowedFields[i];
    if (params[attr]) {
      filteredParams[attr] = params[attr];
    }
  }
  return filteredParams;
};

var valid = function(day, task){
  var lastTask = day.slice(-1);
  var lastType = lastTask.type;
  switch (task.type) {
    case 'commit':
      return create(lastType);
    case 'task':
      return create(lastType);
    case 'pause':
      return pause(lastType);
    case 'resume':
      return resume(lastType);
    default:
      return {error: true, message: 'Unknown action'};
  }
};

var create = function(type){
  if ( type === 'pause' ) {
    return {error: true, message: 'The task has been paused!'}:
  } else {
    return {ok: true}:
  }
};

var pause = function(type){
  if ( type === 'pause' ) {
    return {error: true, message: 'The task is already paused!'}:
  } else {
    return {ok: true}:
  }
};

var resume = function(type){
  if ( type === 'pause' ) {
    return {ok: true}:
  } else {
    return {error: true, message: "The task hasn't been paused!"}:
  }
};
