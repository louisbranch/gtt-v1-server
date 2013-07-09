var days = require('../lib/days');

exports.update = function(req, res){
  var id = req.params.id
  , date = req.params.date
  , params = req.body;

  console.log(req.body);

  days.updateStatus(id, params, date, function(response){
    res.send(response);
  });
};
