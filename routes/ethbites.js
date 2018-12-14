var express = require('express');
var router = express.Router();
var Web3 = require('web3');
var Admin = require('../models/accounts');
var Tn = require('../models/transaction');
var Token = require('../models/token');
var web3 = new Web3("https://rinkeby.infura.io/v3/1daba21cfd7a4d9a8773600e943db915");

router.post('/Balance',function(req,res){

    var cointype = req.body.cointype;
    Admin.find({'cointype': cointype},function(err,result){
      var address = result[0].coinaddress;


      if(cointype =='eth') {
      web3.eth.getBalance(address,(err,result)=>{
              var balance = {
                'address': address,
                'balance' : web3.utils.fromWei(result,'ether')
              };

              res.send(balance);
       });
     }else if(cointype =='att'){

       var abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];
       var contractaddress = '0x0CC5b17fB7a4CE0533de22A099758b06C453Db0f';
       var contract = new web3.eth.Contract(abi, address);
       contract.methods.totalSupply().call((err,result)=>{

         var balance = {
           'address': address

         };

         res.send(balance);
       });

     }

    });

});

router.post('/AccountBalance',function(req,res){
    var addr = req.body.addr;

      web3.eth.getBalance(addr,(err,result)=>{
        var balance = web3.utils.fromWei(result,'ether');
        res.send(balance);
      });
});
router.get('/getTokenDetails',function(req,res){
    Token.find({sym:'ATT'},function(err,result){
        if(err) {
          res.send(false);
        }
          res.send(result);
      });
});

module.exports = router;
