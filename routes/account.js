var express = require('express');
var router = express.Router();
var Web3 = require('web3');
var Tx = require('ethereumjs-tx')

var web3 = new Web3("https://rinkeby.infura.io/v3/1daba21cfd7a4d9a8773600e943db915");

router.get('/',function(req,res){
    address = '0xB7b9AFD2f454F43b3aE5185a2fd253aAf7545850';
    web3.eth.getBalance(address,(err,result)=>{
            var balance = web3.utils.fromWei(result,'ether');
            res.render('accounts/index',{adminAddress:address,balance:balance});
    });
});
router.post('/deposite',function(req,res){
      console.log(req.body);
      //var from = req.body.txtfrom;
      var from = '0xB7b9AFD2f454F43b3aE5185a2fd253aAf7545850';
      //var admin = req.body.txtadmin;
      var admin = '0x5942ae9a41F82011Bafb3b59c2399ed10bA1B3BE';
      var amount = req.body.txtamount;
      //var pkey = req.body.txtprivatekey;
      var pkey = '9C3CFA98FCCBDB29F2419C49E12CC8D60C08EB0CED9EDFB844906D599CE97ECC';
      if(from){
          web3.eth.getTransactionCount(from,(err,txCount)=>{
            const txObject = {
                nonce: web3.utils.toHex(txCount),
                gasLimit: web3.utils.toHex(500000),
                gasPrice: web3.utils.toHex(web3.utils.toWei('20','gwei')),
                to:admin,
                value:web3.utils.toHex(web3.utils.toWei(amount,'ether'))
              }

              var userprivatekey1 = Buffer.from(pkey,'hex');
              // sign the Transaction
              console.log(txObject);
              const tx = new Tx(txObject);
              console.log(pkey);
              const serializedTx = tx.serialize();
              const raw1 = '0x' + serializedTx.toString('hex');

              web3.eth.sendSignedTransaction(raw1, (err,txHash)=>{
                console.log(err);
                console.log('transactionid'+txHash)
                //res.send(txHash);
              });
          });
      }

});
router.post('/transfer',function(req,res){
console.log(req.body);
});
router.post('/withdraw',function(req,res){
console.log(req.body);
});

module.exports = router;
