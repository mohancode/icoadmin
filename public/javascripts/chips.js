$(document).ready(function(){



    $.ajax({
      url: "/getter/getTokenDetails",
      type: 'GET',
      error : function(err) {
        console.log('Error!', err)
      },
      success: function(data) {
          var total,Sell,Balance;
          if(data) {
              total = data[0].totaltoken;
              Sell = data[0].totalsell;
              Balance = total-Sell;
        }else {
          total = 0;
          Sell = 0;
          Balance = 0;
        }

          Morris.Donut({
              element: 'dashboard-donut-1',
              data: [
                  {label: "Total", value: total},
                  {label: "Sell", value: Sell},
                  {label: "Balance", value: Balance}
              ],
              colors: ['#33414E', '#1caf9a', '#FEA223'],
              resize: true
          });
      }
    });


    $('.forTokenDiv').hide();
    $('.balanceFrames').hide();
    $('#transferDiv').hide();
    $('.selectCrypto').change(function(){

        var selectedCrypto = $(this).children("option:selected").val();
        if(selectedCrypto == 'def'){
          $('#transferDiv').hide();
        }else{
          $.ajax({
              url: "/getter/Balance",
              type: 'POST',
              data: {cointype: selectedCrypto },
              error : function(err) {
                console.log('Error!', err)
              },
              success: function(data) {
                    $('#balance').text(data.balance);
                    $('#address').val(data.address);

              }
            });
            if(selectedCrypto === 'eth'){
              $('#transferDiv').show();
              $('.fromText').show();
              $('.inusdDiv').show();
              $('.forTokenDiv').hide();

            }
            if(selectedCrypto === 'att'){
              $('#transferDiv').show();
              $('.fromText').hide();
              $('.inusdDiv').hide();
              $('.forTokenDiv').show();

            }
        }


    });
    $('#selToken').change(function(){
        var selectedCrypto = $(this).children("option:selected").val();
        console.log(selectedCrypto);
        $.ajax({
            url: "/token/getCurrentprice",
            type: 'POST',
            data: {cointype: selectedCrypto },
            error : function(err) {
              console.log('Error!', err)
            },
            success: function(data) {
                  $('#txtcurrentprice').val(data.price);
                  console.log(data);

            }
          });
    });


    // Checking Balance
  /*  $('.btnDeposite').click(function(){

        var from = $('.txtfrom').val();
        var amount = $('.txtamount').val();
        var pkey = $('.txtprivatekey').val();
        var admin= $('.txtadmin').val();
        var formData = {
          'from': from,'admin':+admin,'amount':amount,'pkey':pkey
        }
        console.log(amount+pkey+admin);
        $.ajax({
          url: "/account/deposite",
          type: 'Post',
           data: {formData},
          error : function(err) {
            console.log('Error!', err)
          },
          success: function(data) {
            $('#lblbalance').text('success');
          }
      });
    }); */
    $('#btnCheckBalance').click(function(){

        $('.balanceFrames').show();
        var addr = $('.txtfrom').val();
        $.ajax({
          url: "/getter/AccountBalance",
        type: 'Post',
        data: {addr: addr },
        error : function(err) {
          console.log('Error!', err)
        },
        success: function(data) {

              $('#lblbalance').text(data);

        }
      });
    });
});
