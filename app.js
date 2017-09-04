/*應用程式啟動點*/

// 匯入外部 Node.js 模組，
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

//匯入router模組
var index = require('./routes/index');
var users = require('./routes/users');
var hello = require('./routes/hello');

var appRouters = require('./routes/routers');

var config = require('./config');
var auth = require('./middleware/auth/auth');

// 匯入 Express.js 模組
var app = express();

/*
all environments
*/
// DB連線
// app.use(function(req, res, next) {
//     req.db = db;
//     next();
// });

app.logger  =appRouters;
/// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.set('view engine', 'ejs');

// 呼叫 use() 函數，
//來載入（使用）Middleware，Express.js Middleware 的觀念後續再做說明

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//啟用cookie parser
app.use(cookieParser());

app.use(
  session({
    secret:'cupola360',
    name:'copola360SessionId',
    cookie:{maxAge:30*60*1000},
    resave: false,
    saveUninitialized: true
  }));

///4.x開始
app.use(express.static(path.join(__dirname, 'public')));

///routers
app.use('/', index);
app.use('/users', users);
app.use('/hello', hello);
// app.use('/apis',apis);
app.use('/',appRouters);

app.use(auth.initialize);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.error('not found');
  var err = new Error('Not Found');
  err.status = 404;
  next(err);

});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log('catch 404 and forward to error handler');
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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

//沒加這個nodemon會死
var server = 
  app.listen(3000,function(){
    console.log("Calling app.listen's callback function.");
    console.log(server.address());
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;
