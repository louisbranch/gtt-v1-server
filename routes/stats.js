var stats = require('../lib/stats');

exports.outputTime = function(req, res){
  var id = req.params.id
  , date = req.params.date;

  stats.outputTime(id, date, function(response){
    res.send(response);
  });
};
