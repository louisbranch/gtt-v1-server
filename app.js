var express = require('express')
  , routes = require('./routes')
  , tasks = require('./routes/tasks')
  , http = require('http');

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

app.get('/', routes.index);

// Tasks
app.post('/tasks', tasks.create);
app.put('/tasks', tasks.update);

// Days Stats Log Users

http.createServer(app).listen(app.get('port'));
