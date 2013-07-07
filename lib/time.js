module.exports = {
  minutesToTime: minutesToTime,
  calculateTime: calculateTime
};

function minutesToTime(minutes){
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

function timeToMinutes(timeString){
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

function calculateTime(day){
  var breaksInMinutes = calculateBreaks(day.breaks);
  var dayDuration = calculateDayDuration(day);
  return dayDuration - breaksInMinutes;
}

function calculateBreaks(breaks){
  var totalTime = 0;
  for (var i=0; i < breaks.length; i++){
    var pauseTime = timeToMinutes(breaks[i].start);
    if (breaks[i].end) {
      var resumeTime = timeToMinutes(breaks[i].end);
      totalTime += (resumeTime - pauseTime);
    }
  }
  return totalTime;
}

function calculateDayDuration(day){
  var start = timeToMinutes(day.start);
  if (day.end) {
    var end = timeToMinutes(day.end);
  } else {
    var lastTaskEnd = getLastTaskEnd(day);
    var end = timeToMinutes(lastTaskEnd);
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
