var projects = require('../lib/projects');

exports.create = function(req, res){
  var id = req.params.id;
  projects.createProject(id, function(response){
    res.send(response);
  });
};
