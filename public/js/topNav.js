var PORT = 3400;
(function(){
  
  var signUpController = new Vue({ // eslint-disable-line
      el: '#signUpController',
      data: {
        cartData : [],
        total : 0
      },
      created: function(){
        this.count();
        this.getCart();
      },
      filters : {
        toCurrency : function (value) {
          if (typeof value !== "number") {
              value = parseFloat(value);
          }
          var formatter = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'Php',
              minimumFractionDigits: 0
          });
          return formatter.format(value);
      }
      },
      methods: {
        toCurrency : function (value) {
          if (typeof value !== "number") {
              value = parseFloat(value);
          }
          var formatter = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'Php',
              minimumFractionDigits: 0
          });
          return formatter.format(value);
      },
        notification: function(type, message){
          $.notify(message, type);
      },
        showCart: function(){
            $('#cartId').modal('show');
            this.getCart();
        },
        count : function(){
          this.total = 0;
          var tempTotal = 0;
          axios.get(`http://localhost:${PORT}/cart`)
            .then((response) => {
                var ctr = 0;
                if (response.data.length > 0){
                  for(var i = 0; i < response.data.length ; i++){
                    ctr += response.data[i].qty;
                  }
                }
                
                this.total = tempTotal;
                //$('#totalAmount').html(tempTotal);
                $('#cartBadge').html(ctr);
            }).catch((err) => {
                this.products = [];
                this.notification('error', 'Error while requesting for data.');
            });
        },
        getCart : function(){
          axios.get(`http://localhost:${PORT}/cart`)
            .then((response) => {
                var ctr = 0;
                this.cartData = response.data;
                var tempTotal = 0;
                if (response.data.length > 0){
                  for(var i = 0; i < response.data.length ; i++){
                    ctr += response.data[i].qty;
                    tempTotal += parseFloat(response.data[i].qty * response.data[i].price)
                  }
                }
                
                this.total = tempTotal;
                $('#totalAmount').html(this.toCurrency(tempTotal));
                $('#cartBadge').html(ctr);
            }).catch((err) => {
                this.products = [];
                //this.notification('error', 'Error while requesting for data.');
            });
        },
        addToCart : function(id, price, name, photo, input){
          var qty = input.target.value;
  
          var data = {
            productId : id,
            qty : parseInt(qty),
            price : price,
            name : name,
            photo : photo
          }
         
          axios.post(`http://localhost:${PORT}/cart/data`, data)
            .then((response) => {
                var ctr = 0;
  
                if (response.data.length > 0){
                  for(var i = 0; i < response.data.length ; i++){
                    ctr += response.data[i].qty;
                  }
                }
                
                $('#cartBadge').html(ctr);

                this.getCart();
            }).catch((err) => {
                this.products = [];
                // this.notification('error', 'Error while requesting for data.');
            });
        },
        checkOut : function(){
          axios.get(`http://localhost:${PORT}/isLogin`)
            .then((response) => {
              if(response.data.status == "error"){
                $('#cartId').modal('hide');
                $('#decideCheckout').modal('show');
              }else{

              }
            }).catch((err) => {
                this.products = [];
                //this.notification('error', 'Error while requesting for data.');
            });
        }
      }
  });

})();
