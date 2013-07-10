var db = require('./db');
var time = require('./time');

module.exports = {
  get: get,
  insert: insert,
  timeWorked: timeWorked,
  update: update
};

function update(id, params, date, callback){
  var project = db.use(id);
  if (params.start) {
    start = {start: params.start, tasks: [], breaks: []}; // Validate time format
    insert(project, start, date, callback);
  } else if (params.end) {
    get(project, date, function(err, day){
      if (err) { return callback({error: true, message: "Day hasn't been started yet!"}); }
      finish(project, params, day, callback);
    });
  } else {
    callback({error: true, message: 'Unknown action'})
  }
}

function get(project, date, callback){
  project.get(date, {}, function(err, day){
    callback(err, day);
  });
}

function insert(project, params, date, callback){
  project.insert(params, date, function(err, body){
    if (err) {
      callback({error: true, message: 'Day already started!'});
    } else {
      callback({ok: true});
    }
  });
}

function finish(project, params, day, callback){
  var ended = merge(day, {end: params.end});
  var total = time.toMinutes(ended);
  var dayUpdated = merge(ended, {totalTime: total});
  insert(project, dayUpdated, null, callback);
}

function merge(day, params){
  for (var attr in params) {
    day[attr] = params[attr];
  }
  return day;
}

function timeWorked(id, date, callback){
  var project = db.use(id);
  get(project, date, function(err, day){
    if (err) {
      return callback({error: true, message: "Day hasn't been started yet!" });
    }
    var minutes = time.toMinutes(day, {format: 'pretty'});
    callback({ok: true, message: minutes});
  });
}
