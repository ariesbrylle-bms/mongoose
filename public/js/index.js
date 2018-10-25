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

  $("#demo").carousel({interval: 5000});

})();