var PORT = 3400;
(function(){
  
  var signUpController = new Vue({ // eslint-disable-line
      el: '#signUpController',
      data: {
      },
      created: function(){
        this.count();
      },
      methods: {
        showCart: function(){
              $('#cartId').modal('show');
        },
        count : function(){

          axios.get(`http://localhost:${PORT}/cart`)
            .then((response) => {
                var ctr = 0;
                if (response.data.length > 0){
                  for(var i = 0; i < response.data.length ; i++){
                    ctr += response.data[i].qty;
                  }
                }
                
                $('#cartBadge').html(ctr);
            }).catch((err) => {
                this.products = [];
                this.notification('error', 'Error while requesting for data.');
            });
        }
      }
  });

  var indexController = new Vue({ // eslint-disable-line
    el: '#indexController',
    data: {
      topProducts : [],
      newProducts : []
    },
    created: function(){
      this.fOnload();
    },
    filters: {
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
      fOnload: function(){
          axios.get(`http://localhost:${PORT}/products/getTop`)
              .then((response) => {
                  this.ctr = 0;
                  this.topProducts = response.data;
              }).catch((err) => {
                  this.products = [];
                  this.notification('error', 'Error while requesting for data.');
              });
          
          axios.get(`http://localhost:${PORT}/products/getNew`)
          .then((response) => {
              this.ctr = 0;
              this.newProducts = response.data;
          }).catch((err) => {
              this.products = [];
              this.notification('error', 'Error while requesting for data.');
          });
      },
      addToCart : function(id, price, name, photo, input){
        var elemId = '';
        if (input.target.parentElement.id == ""){
          elemId = input.target.id;
        }else{
          elemId = input.target.parentElement.id;
        }

        var qty = parseInt($('#'+elemId).prev()[0].value);

        var data = {
          productId : id,
          qty : qty,
          price : price,
          name : name,
          photo : photo
        }
       
        axios.post(`http://localhost:${PORT}/cart`, data)
          .then((response) => {
              var ctr = 0;

              if (response.data.length > 0){
                for(var i = 0; i < response.data.length ; i++){
                  ctr += response.data[i].qty;
                }
              }
              
              $('#cartBadge').html(ctr);
          }).catch((err) => {
              this.products = [];
              this.notification('error', 'Error while requesting for data.');
          });
      },
      rndStr : function() {
        var len = 5;
        let text = ""
        let chars = "abcdefghijklmnopqrstuvwxyz"
      
        for( let i=0; i < len; i++ ) {
          text += chars.charAt(Math.floor(Math.random() * chars.length))
        }
  
        return text
      }
    }
});

  $("#demo").carousel({interval: 3000});

})();
