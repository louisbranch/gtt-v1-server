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

app.put('/projects/:id', projects.create);
app.put('/projects/:id/days/:date', days.update);
app.post('/projects/:id/days/:date/tasks', tasks.create);

// Days Stats Log Users

http.createServer(app).listen(app.get('port'));
