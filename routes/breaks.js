var breaks = require('../lib/breaks');

module.exports = {
  create: create
};

function create(req, res){
  var id = req.params.id
  , date = req.params.date
  , params = req.body;

  breaks.create(id, params, date, function(response){
    res.send(response);
  });
}
