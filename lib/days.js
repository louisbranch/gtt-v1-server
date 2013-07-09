var db = require('./db');
var time = require('./time');

exports.updateStatus = function(id, params, date, callback){
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
};

var get = function(project, date, callback){
  project.get(date, {}, function(err, day){
    callback(err, day);
  });
};
exports.get = get;

var insert = function(project, params, date, callback){
  project.insert(params, date, function(err, body){
    if (err) {
      callback({error: true, message: 'Day already started!'});
    } else {
      callback({ok: true});
    }
  });
};
exports.insert = insert;

var finish = function(project, params, day, callback){
  var ended = merge(day, {end: params.end});
  var total = time.calculateTime(ended);
  var dayUpdated = merge(ended, {totalTime: total});
  insert(project, dayUpdated, null, callback);
}

var merge = function(day, params){
  for (var attr in params) {
    day[attr] = params[attr];
  }
  return day;
};
