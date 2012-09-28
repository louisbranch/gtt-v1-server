var projects = require('./projects');
var days = require('./days');
var time = require('./time');

exports.read = function(id, date, callback){
  var project = projects.use(id);
  days.get(project, date, function(err, day){
    if (err) {
      return callback({error: true, message: "Day hasn't been started yet!" });
    }
    calculateTime(day, callback);
  });
};

var calculateTime = function(day, callback){
  var breaksInMinutes = calculateBreaks(day.breaks);
  var dayDuration = calculateDayDuration(day);
  var minutesSpent = dayDuration - breaksInMinutes;
  var timeSpent = time.minutesToTime(minutesSpent);
  callback({ok: true, message: timeSpent});
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
  if (day.end) {
    var start = time.timeToMinutes(day.start);
    var end = time.timeToMinutes(day.end);
    return end - start;
  }
};

