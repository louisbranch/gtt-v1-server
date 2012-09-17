var projects = require('../lib/projects');

exports.create = function(req, res){
  projects.createProject(function(newProject){
    res.send(newProject.id);
  });
};
