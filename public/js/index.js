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
      resetForm : function(){
        this.sku = '';
        this.name = ''; 
        this.description = ''; 
        this.quantity = ''; 
        this.price = ''; 
        this.photo_path = ''; 
        this.productId = ''; 
        $('#img-upload').attr('src','');
        $('input').val('')
      },
      notification: function(type, message){
          $.notify(message, type);
      },
      onSubmit: function(){
        if (typeof $("#imgInp")[0].files[0] == "undefined"){
          return this.notification('error', 'Please select image only.');
        }
        var blobFile = $("#imgInp")[0].files[0];
        var formData = new FormData();
        formData.append("file", blobFile);

      
        $.ajax({
           url:  `http://localhost:${PORT}/upload_image`,
           type: "POST",
           data: formData,
           processData: false,
           contentType: false,
           success: function(response) {
               if (response.status == "Success"){
                productController.photo_path = response.path;
                var payload = {
                  sku : productController.sku,
                  name : productController.name,
                  description : productController.description,
                  quantity : productController.quantity,
                  price : productController.price,
                  photo_path : response.path,
                  productId : productController.productId
                };

                if (String(this.productId) == "" || String(this.productId) == String(null) || String(this.productId) == String(undefined)){
                  axios.post(`http://localhost:${PORT}/products/add`, payload)
                    .then((res) => {
                      if (res.data.status == "Success"){
                        productController.resetForm();
                        return productController.notification('success', res.data.message);
                      }else{
                        productController.notification('error', res.data.message);
                      }
                    }).catch((err) => {
                        productController.notification('error', 'Error while saving.');
                        console.log(err);
                    });
                }else{
                  
                }
               }else{
                return this.notification('error', 'Please select .png image only.');
               }               
           },
           error: function(jqXHR, textStatus, errorMessage) {
               console.log(errorMessage); // Optional
           }
        });
    
      },
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

     // uploadFile(input);
  }

  $("#imgInp").change(function(){
      readURL(this);
  });
  
  
});