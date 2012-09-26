var projects = require('./projects');
var days = require('./days');

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
  var tasks = day.tasks;
  var times = extractPauses(tasks);
  var pausesInMinutes = calculatePauses(times.pauses);
  var dayDuration = calculateDayDuration(day);
  var minutesSpent = dayDuration - pausesInMinutes;
  var timeSpent = minutesToTime(minutesSpent);
  callback({ok: true, message: timeSpent});
};

var extractPauses = function(tasks){
  var pausesTime = []
    , tasksTime = [];
  for(var i=0; i < tasks.length; i++){
    var type = tasks[i].type;
    if (type === 'pause' || type === 'resume') {
      pausesTime.push(tasks[i].time);
    } else {
      tasksTime.push(tasks[i].time);
    }
  }
  return {pauses: pausesTime, tasks: tasksTime}
};

var calculatePauses = function(pauses){
  var totalTime = 0;
  while (pauses.length > 1) {
    var times = pauses.splice(0,2);
    var pauseTime = timeToMinutes(times[0]);
    var resumeTime = timeToMinutes(times[1]);
    totalTime += (resumeTime - pauseTime);
  }
  return totalTime;
}

var timeToMinutes = function(timeString){
  var regex = new RegExp("(\\d\\d):(\\d\\d)");
  var match = timeString.match(regex);
  if (match) {
    var hours = parseInt(match[1], 10)
      , minutes = parseInt(match[2], 10)
      , time = hours * 60 + minutes;
    return time;
  } else {
    throw 'Invalid time format'
  }
};

var minutesToTime = function(minutes){
  var output = ''
  var hours = Math.floor(minutes / 60);
  var min = minutes % 60;
  if (hours < 10) {
    output += '0';
  }
  output += hours;
  output += ':';
  if (min < 10){
    output += '0';
  }
  output += min;
  output += ' hours worked today';
  return output;
};

var calculateDayDuration = function(day){
  if (day.end) {
    var start = timeToMinutes(day.start);
    var end = timeToMinutes(day.end);
    return end - start;
  }
};
