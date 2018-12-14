var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
var indexRouter = require('./routes/index');
var tokenRouter = require('./routes/token');
var usersRouter = require('./routes/users');
var accountRouter = require('./routes/account');
var salesRouter = require('./routes/sale');
var transactionRouter = require('./routes/transactions');
var mongoose = require('mongoose');
var snacksRouter = require('./routes/ethbites')
var app = express();

// view engine setup
app.engine('.hbs',expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/whitehouse',{ useNewUrlParser: true });
var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  console.log("Connection error");
  db.once('open', function callback () {
    console.log("Connection Open");
  });

app.use('/users', usersRouter);
app.use('/token', tokenRouter);
app.use('/sales', salesRouter);
app.use('/account', accountRouter);
app.use('/getter', snacksRouter);
app.use('/transactions', transactionRouter);
app.use('/', indexRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
