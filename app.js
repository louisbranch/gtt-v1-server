var express = require('express')
  , http = require('http')
  , routes = require('./routes')
  , days = require('./routes/days')
  , projects = require('./routes/projects')
  , tasks = require('./routes/tasks');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 9393);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Projects
app.put('/projects/:id', projects.create);

// Days
app.put('/projects/:id/days/:date', days.update);

// Tasks
app.post('/tasks', tasks.create);
app.put('/tasks', tasks.update);

// Days Stats Log Users

http.createServer(app).listen(app.get('port'));
