var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('express-flash');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var validator = require('express-validator');
var Mongostore = require('connect-mongo')(session);

var app = express();

mongoose.connect('mongodb://test:test123@ds163683.mlab.com:63683/ecommerce')
require("./config/passport");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  store: new Mongostore({mongooseConnection : mongoose.connection}),
  cookie:{maxAge: 180*60*1000 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

app.use('/users', usersRouter);
app.use('/', indexRouter);



module.exports = app;
app.listen(3000);
