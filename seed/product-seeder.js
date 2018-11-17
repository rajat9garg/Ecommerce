var Product = require('../models/product');
var bodyparser=require('body-parser');

var mongoose = require('mongoose');

var connection = 'mongodb://test:test123@ds163683.mlab.com:63683/ecommerce'
var urlencoded = bodyparser.urlencoded({extended:false});
mongoose.connect(connection, {useNewUrlParser: true});

var products = [
  new Product({
      imagePath:"https://icdn3.digitaltrends.com/image/fifa-19-game-art-ps4-720x720.jpg",
      title:'Fifa 19',
      description:'the Best football game',
      price:3000
  }),
  new Product({
      imagePath:"https://www.game-debate.com/pic.php?g_id=23183&game=Call%20of%20Duty:%20Black%20Ops%203",
      title:'Call of duty',
      description:'Shooting Game',
      price:2500
  }),
  new Product({
      imagePath:"https://www.freepngimg.com/thumb/need_for_speed/24863-9-need-for-speed-file-thumb.png",
      title:'Need For Speed',
      description:'Racing Game',
      price:4500
  }),
  new Product({
      imagePath:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Phr7wCbpGaXlAEiKaOEhLrLk2OdU68YalHtQrtlbfpVoKfUvNw",
      title:'Fortnite',
      description:'Real Life Adventure Games',
      price:1500
  }),
  new Product({
      imagePath:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2MsAfnWZxhHSBS7XtOGT3l_TIQsYrAJjrMZ9IWa0D3PxoM2c7",
      title:'PUBG',
      description:'Multiplayer hooting Games',
      price:1000
  }),
  new Product({
      imagePath:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5_nOc1rrgsK3jwDfAv8AazpBl4zTstn0wR35jtTG1eYbAX6e1",
      title:'GTA-V',
      description:'Grand-Theft-auto',
      price:2200
  })

];
var done=0;

for(var i=0;i< products.length; i++){
  products[i].save(function(err,result){
    done++;
    if(done==products.length){
      exit();
    }
  });
}

function exit(){
  mongoose.disconnect();
}
