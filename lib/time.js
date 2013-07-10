module.exports = {
  toMinutes: toMinutes,
  display: display
};

function toMinutes(day){
  var breaks = breaksInMinutes(day.breaks);
  var totalTime = dayInMinutes(day);
  return totalTime - breaks;
}

function display(minutes) {
  var hrs = Math.floor(minutes / 60);
  var min = minutes % 60;
  hrs = hrs < 10 ? '0' + hrs : hrs;
  min = min < 10 ? '0' + min : min;
  return hrs + ':' + min;
}

function dayInMinutes(day){
  var task;
  var start = parse(day.start);
  if (day.end) { return parse(day.end) - start; }

  task = getLastTask(day);
  if (task) { return parse(task.end) - start; }

  return 0;
}

function breaksInMinutes(breaks){
  return breaks.reduce(function(acc, brk) {
    var end = parse(brk.end);
    var start = parse(brk.start);
    var total = end ? start - end : 0;
    return acc - total;
  }, 0);
}

function parse(timeString){
  var regex = new RegExp("(\\d\\d):(\\d\\d)");
  var match = timeString.match(regex);
  if (!match) { throw 'Invalid time format' }

  var hours = parseInt(match[1], 10);
  var minutes = parseInt(match[2], 10);
  return hours * 60 + minutes;
}

function getLastTask(day){
  var length = day.tasks.length;
  return lastTask = day.tasks[length - 1];
}
