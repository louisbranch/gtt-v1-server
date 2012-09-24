var projects = require('./projects');
var days = require('./days');

exports.create = function(id, params, date, callback){
  var project = projects.use(id);
  days.get(project, date, function(err, day){
    if (err) {
      return callback({error: true, message: err.message });
    }
    add(project, params, day, callback);
  });
};

var add = function(project, params, day, callback){
  var task = filter(params);
  if (day.end) {
    return callback({error: true, message: 'Day already over!'})
  }
  day.tasks.push(task);
  days.insert(project, day, null, callback);
};

var filter = function(params){
  var allowedFields = ['time', 'type', 'message', 'branch'];
  var filteredParams = {};
  for (var i=0; i < allowedFields.length; i++) {
    var attr = allowedFields[i];
    if (params[attr]) {
      filteredParams[attr] = params[attr];
    }
  }
  return filteredParams;
};

