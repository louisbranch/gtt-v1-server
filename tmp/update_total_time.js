var db = require('nano')('http://localhost:5984/replaypoker');
var time = require('./lib/time');

db.list({include_docs: true}, function (err, body) {
  if (err) throw 'DB FAILED!';

  body.rows.forEach(function (day) {
    if (!day.doc.start) return;
    var total = time.calculateTime(day.doc);
    day.doc.totalTime = total;
    db.insert(day.doc, day.id);
  });
});
