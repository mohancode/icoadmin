var express = require('express');
var router = express.Router();
var Token = require('../models/token');
router.get('/',function(req,res){
  res.render('token/index');
});

router.post('/getCurrentprice',function(req,res){

  var tokenSym = req.body.cointype;

  Token.find({sym: tokenSym },function(err,result){

    var balance = {'price': result[0].price};
    res.send(balance);
  });
});

router.post('/settingprice', function(req,res){
  var sym = req.body.selToken;
  var newPrice = req.body.txtnewprice;
  console.log("data========");
  console.log(sym);
  console.log(newPrice);
  console.log(req.body);
  Token.findOneAndUpdate({sym: 'ATT'},{$set:{price: newPrice}},function(err,result){

      res.redirect('/token');
  });
});

module.exports = router;
