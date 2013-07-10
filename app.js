var express = require('express')
  , http = require('http')
  , auth = require('./lib/auth')
  , days = require('./routes/days')
  , projects = require('./routes/projects')
  , breaks = require('./routes/breaks')
  , tasks = require('./routes/tasks');

var app = express();

module.exports = {
  start: start
};

app.configure(function(){
  app.set('port', process.env.PORT || 9393);
  //app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.param('id', function(req, res, next, id){
  if (req.route.path === '/projects/:id' && req.method === 'PUT') {
    return next();
  }
  var token = req.query.token;
  if (token) {
    auth.validate(id, token, function(err, success){
      if (err) {
        res.status(400);
        return res.send(err);
      }
      next();
    });
  } else {
    res.status(400);
    res.send('Missing token!')
  }
});

app.put('/projects/:id', projects.create);
app.del('/projects/:id', projects.destroy);
app.get('/projects/:id/days/:date', days.show);
app.put('/projects/:id/days/:date', days.update);
app.post('/projects/:id/days/:date/tasks', tasks.create);
app.post('/projects/:id/days/:date/breaks', breaks.create);

function start(port) {
  port = port || app.get('port');
  return http.createServer(app).listen(port);
}

if (require.main === module) {
  start();
}
