var Product = require('../models/accounts');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/whitehouse',{ useNewUrlParser: true });


var products =[

  /*new Product({
    coinaddress: '0xB7b9AFD2f454F43b3aE5185a2fd253aAf7545850',
    cointype:'eth'
  }),*/
  new Product({
    coinaddressaccount: '0x0CC5b17fB7a4CE0533de22A099758b06C453Db0f',
    cointype:'att'
  })

];
var done=0;
for(var i=0;i< products.length;i++){
  products[i].save(function(err,result){
    done++;
    if(done === products.length){
      exit();
    }
  });
}

function exit(){
  mongoose.disconnect();
}
