(function(){
  var PORT = 3400;
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

  // login.pug
  var loginController = new Vue({ // eslint-disable-line
    el: '#loginController',
    data: {
      username : null,
      password : null
    },
    created: function(){
    },
    methods: {
      notification: function(type, message){
          $.notify(message, type);
      },
      onSubmit: function(){
        var payload = {
            username: this.username,
            password: this.password
        };

        axios.post(`http://localhost:${PORT}/login`, payload)
            .then((res) => {
                if (res.data.status == "Success"){
                  window.location.href = '/';
                }else{
                  this.notification('error', res.data.message);
                }
            }).catch((err) => {
                // this.notification('error', 'Error while saving.');
                console.log(err);
            });
        
      }
    }
});

  $("#demo").carousel({interval: 3000});

})();