/* Total of minutes by month */

// Map
function (doc) {
  if (!doc.start) return;
  var month = doc._id.slice(0, 7);
  emit(month, doc.totalTime);
}

// Reduce
function (month, totalTime, rereduce) {
  return sum(totalTime);
}
