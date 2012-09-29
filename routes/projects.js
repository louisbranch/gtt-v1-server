var projects = require('../lib/projects');

exports.create = function(req, res){
  var id = req.body.id;
  console.log(id);
  projects.createProject(id, function(response){
    res.send(response);
  });
};
