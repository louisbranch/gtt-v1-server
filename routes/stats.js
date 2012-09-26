var stats = require('../lib/stats');

exports.read = function(req, res){
  var id = req.params.id
  , date = req.params.date;

  stats.read(id, date, function(response){
    res.send(response);
  });
};
