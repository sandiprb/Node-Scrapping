var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');


var app = express();

var nunjucks  = require('nunjucks');
var routes = require('./routes/index');

// view engine setup
app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, 'templates'), {
    autoescape: true,
    express: app
});


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));
app.use(session({secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

/*APP Routes*/
app.use('/', require('./routes/index'));
app.use('/top/movies', require('./routes/TopMovies'));
app.use('/movie', require('./routes/movie'));


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});


module.exports = app;
