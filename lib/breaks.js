exports.paused = function(day){
  var last = day.breaks.slice(-1)[0];
  if (!last) {
    return false;
  }
  return !last.end;
};

