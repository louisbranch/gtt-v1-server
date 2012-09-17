exports.getProject = function(id){
  var projects = dbServer.db.use('projects');
  projects.get(id, function(err, body){
    if (err) {
      console.log(err.message);
    } else {
      return body;
    }
  });
};

exports.createProject = function(){
  var projects = dbServer.db.use('projects');
  projects.insert({months: []}, nil, function(err, body){
    if (err) {
      console.log(err.message);
    } else {
      return body.id;
    }
  });
};
