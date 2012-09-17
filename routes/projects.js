var projects = require('../lib/projects');

exports.create = function(req, res){
  newProject = projects.createProject();
  res.send(newProject.id);
};
