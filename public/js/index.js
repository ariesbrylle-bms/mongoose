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
                    window.location.href = res.data.url;
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

  // products controller
  var productController = new Vue({ // eslint-disable-line
    el: '#productController',
    data: {
      sku : null,
      name : null,
      description : null,
      quantity : null,
      price : null,
      photo_path : null,
      productId : null
    },
    created: function(){
    },
    methods: {
      notification: function(type, message){
          $.notify(message, type);
      },
      onSubmit: function(){
        var payload = {
          sku : this.sku,
          name : this.name,
          description : this.description,
          quantity : this.quantity,
          price : this.price,
          photo_path : this.photo_path,
          productId : this.productId
        };

        if (this.productId == ""){
          axios.post(`http://localhost:${PORT}/products/add`, payload)
            .then((res) => {
                if (res.data.status == "Success"){
                  window.location.href = res.data.url;
                }else{
                  this.notification('error', res.data.message);
                }
            }).catch((err) => {
                // this.notification('error', 'Error while saving.');
                console.log(err);
            });
        }else{

        }
      }
    }
  });
  $("#demo").carousel({interval: 3000});

})();


$(document).ready( function() {
  $(document).on('change', '.btn-file :file', function() {
    var input = $(this),
    label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [label]);
  });

  $('.btn-file :file').on('fileselect', function(event, label) {
      
      var input = $(this).parents('.input-group').find(':text'),
          log = label;
      
      if( input.length ) {
          input.val(log);
      } else {
          if( log ) alert(log);
      }
    
  });
  function readURL(input) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();
          
          reader.onload = function (e) {
              $('#img-upload').attr('src', e.target.result);
          }
          
          reader.readAsDataURL(input.files[0]);
      }
  }

  $("#imgInp").change(function(){
      readURL(this);
  }); 	
});