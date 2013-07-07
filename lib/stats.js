var projects = require('./projects');
var days = require('./days');
var time = require('./time');

module.exports = {
  outputTime: outputTime,
  calculateTime: calculateTime
};

function outputTime (id, date, callback){
  var project = projects.use(id);
  days.get(project, date, function(err, day){
    if (err) {
      return callback({error: true, message: "Day hasn't been started yet!" });
    }
    calculateTime(day, callback);
  });
};

function calculateTime (day, callback){
  var breaksInMinutes = calculateBreaks(day.breaks);
  var dayDuration = calculateDayDuration(day);
  var minutesSpent = dayDuration - breaksInMinutes;
  var timeSpent = time.minutesToTime(minutesSpent);
  if (callback) {
    callback({ok: true, message: timeSpent});
  } else {
    return minutesSpent;
  }
};

var calculateBreaks = function(breaks){
  var totalTime = 0;
  for (var i=0; i < breaks.length; i++){
    var pauseTime = time.timeToMinutes(breaks[i].start);
    if (breaks[i].end) {
      var resumeTime = time.timeToMinutes(breaks[i].end);
      totalTime += (resumeTime - pauseTime);
    }
  }
  return totalTime;
}

var calculateDayDuration = function(day){
  var start = time.timeToMinutes(day.start);
  if (day.end) {
    var end = time.timeToMinutes(day.end);
  } else {
    var lastTaskEnd = getLastTaskEnd(day);
    var end = time.timeToMinutes(lastTaskEnd);
  }
  return end - start;
};

var getLastTaskEnd = function(day){
  var lastTask = day.tasks.slice(-1)[0];
  if (lastTask) {
    return lastTask.end;
  } else {
    return day.start;
  }
};
