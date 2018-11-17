var express = require('express');
var router = express.Router();
var products = require('../models/product');
var Cart = require('../models/cart');

/* GET home page. */
router.get('/', function(req, res, next) {
  products.find(function(err, docs){
    res.render('index', { title: 'GameWorld', products : docs });
  });
});

router.get('/add-to-cart/:id', function(req,res,next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  products.findById(productId, function(err, product){
    if (err){
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  });
});

router.get('/shopping', function(req,res,next){
  if(!req.session.cart){
    return res.render('shop/shopping',{products:null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping',{products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout',function(req,res,next){
  if(!req.session.cart){
    return res.render('shop/shopping');
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/checkout',{totalPrice: cart.totalPrice});
});


module.exports = router;
