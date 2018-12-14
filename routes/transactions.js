var express = require('express');
var router = express.Router();
var Transaction = require('../models/transaction');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Transaction.find({},function(err,result){
    console.log(result);
    res.render('transaction/index', { transaction: result });
  });
});

module.exports = router;
