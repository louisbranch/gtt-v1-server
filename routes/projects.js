var projects = require('../lib/projects');

module.exports = {
  create: create,
  destroy: destroy
};

function create(req, res) {
  var id = req.body.id;
  projects.create(id, function(response){
    res.send(response);
  });
}

function destroy(res, res) {
  var id = req.params.id;
  projects.destroy(id, function(response){
    res.send(response);
  });
}
