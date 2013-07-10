var days = require('../lib/days');
var stats = require('../lib/stats');

module.exports = {
  update: update,
  show: show
};

function update(req, res){
  var id = req.params.id
  , date = req.params.date
  , params = req.body;

  days.update(id, params, date, function(response){
    res.send(response);
  });
}

function show(req, res){
  var id = req.params.id
  , date = req.params.date;

  stats.timeWorked(id, date, function(response){
    res.send(response);
  });
}
