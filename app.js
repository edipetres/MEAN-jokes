var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

var dbfacade = require('./model/jokes')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// Implementing routes
app.get('/api/jokes', function (req, res) {
  dbfacade.allJokes(function (err, data) {
    if (err) {
      console.log("Error: " + err);
    }
    var resp = '';
    data.forEach(function (element) {

    });
    res.send(data);
  });
});

app.get('/api/joke/:id', function (request, response) {
  var id = request.params.id;
  dbfacade.findJoke(id, function (err, result) {
    if (err) {
      res.render('error');
    }
    else {
      response.send(result)
    }
  });

});

app.po


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
