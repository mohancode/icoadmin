var express = require('express');
var router = express.Router();
var Web3 = require('web3');
var web3 = new Web3("https://rinkeby.infura.io/v3/1daba21cfd7a4d9a8773600e943db915");

/* GET home page. */
router.get('/', function(req, res, next) {
   var adminAddress = '0xB7b9AFD2f454F43b3aE5185a2fd253aAf7545850';
   var contractAddress = '0x0CC5b17fB7a4CE0533de22A099758b06C453Db0f';
   web3.eth.getBalance(adminAddress,(err,result)=>{
     var balance = web3.utils.fromWei(result, 'ether');
     balance = balance.substring(0, 6);
     res.render('index', { title: 'Express', adminAddress: adminAddress ,contractAddress: contractAddress,balance: balance});
   });
});

module.exports = router;
