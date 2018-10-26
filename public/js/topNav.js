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

})();
