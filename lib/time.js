exports.minutesToTime = function(minutes){
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

exports.timeToMinutes = function(timeString){
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
