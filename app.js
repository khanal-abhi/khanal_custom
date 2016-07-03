var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('client-sessions');

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  cookieName: 'demo_session',
  secret: 'ASCACD!#RH%&H*K',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}));

app.use(express.static(path.join(__dirname, 'public')));



MongoClient.connect("mongodb://localhost:27017/data_db", function (err, db) {
// MongoClient.connect("mongodb://localhost:27017/data_db", function (err, db) {
  if(err){
    console.println("error connecting to the database!");
  } else {
    console.log("connection established successfully!");

    // add the db connection

    app.use(function (req, res, next) {
      req.db = db;
      req.ObjectID = ObjectID;
      next();
    });

    app.use('/', routes);
    app.use('/users', users);
    app.use('/api', api);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });


// error handlers

// development error handler
// will print stacktrace
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      });
    }

// production error handler
// no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });



  }
});

module.exports = app;
