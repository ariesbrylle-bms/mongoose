var PORT = 3400;
(function(){
  
  var signUpController = new Vue({ // eslint-disable-line
      el: '#signUpController',
      data: {
      },
      created: function(){
      },
      methods: {
        showCart: function(){
              $('#cartId').modal('show');
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
                  console.log(response.data)
              }).catch((err) => {
                  this.products = [];
                  this.notification('error', 'Error while requesting for data.');
              });
          
          axios.get(`http://localhost:${PORT}/products/getNew`)
          .then((response) => {
              this.ctr = 0;
              this.newProducts = response.data;
              console.log(response.data)
          }).catch((err) => {
              this.products = [];
              this.notification('error', 'Error while requesting for data.');
          });
      }
    }
});

  $("#demo").carousel({interval: 3000});

})();
