var days = require('../lib/days')

exports.update = function(req, res){
  var id = req.params.id
  , date = req.params.date
  , start = req.body.start
  , end = req.body.end;

  if (start){
    days.createDay(id, date, start, function(response){
      res.send(response);
    });
  } else if (end) {
    days.finishDay(id, date, end, function(response){
      res.send(response);
    });
  } else {
    res.send({error: true, message: 'Unknown action'})
  }
};
