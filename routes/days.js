var days = require('../lib/days')

exports.create = function(req, res){
  var id = req.params.id;
  var date = req.body.date;
  var time = req.body.time;
  days.createDay(id, date, time, function(response){
    res.send(response);
  });
};
