var projects = require('./projects');
var days = require('./days');
var time = require('./time');

module.exports = {
  outputTime: outputTime
};

function outputTime(id, date, callback){
  var project = projects.use(id);
  days.get(project, date, function(err, day){
    if (err) {
      return callback({error: true, message: "Day hasn't been started yet!" });
    }
    print(day, callback);
  });
}

function print(day, callback) {
  var minutesSpent = time.calculateTime(day);
  var timeSpent = time.minutesToTime(minutesSpent);
  callback({ok: true, message: timeSpent});
}

