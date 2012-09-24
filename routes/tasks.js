var tasks = require('../lib/tasks');

exports.create = function(req, res){
  var id = req.params.id
  , date = req.params.date
  , params = req.body;

  tasks.create(id, params, date, function(response){
    res.send(response);
  });
};
