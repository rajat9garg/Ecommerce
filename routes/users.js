var express = require('express');
var router = express.Router();
var passport =  require('passport')
var products = require('../models/product');


var csrf = require('csurf');

var csrfProtection= csrf();

router.use(csrfProtection);


router.get('/signup', function(req, res, next){
  var messages = req.flash('error');
  res.render('users/signup', {csrfToken : req.csrfToken()});
});

router.post('/signup', passport.authenticate('local.signup',{
  successRedirect: "/users/profile",
  faluireRedirect: "/users/signup",
  failureFlash: true
}));

router.get('/signin', function(req,res,next){
  var messages = req.flash('error');
  res.render('users/signin', {csrfToken : req.csrfToken()});
});

router.post('/signin', passport.authenticate('local.signin',{
  successRedirect: "/users/profile",
  faluireRedirect: "/users/signin"
}));

router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/');
});

router.get('/profile', isLoggedIn, function(req,res,next){
  res.render('users/profile');
});



module.exports = router;

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/users/signin');

}
