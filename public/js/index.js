var PORT = 3400;
(function(){
  
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
      productId : 'none',
      products :[],
      ctr : 0
    },
    created: function(){
      this.fOnload()
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
          axios.get(`http://localhost:${PORT}/products/get`)
              .then((response) => {
                  this.ctr = 0;
                  this.products = response.data;
                  console.log(response.data)
              }).catch((err) => {
                  this.products = [];
                  this.notification('error', 'Error while requesting for data.');
              });
      },
      resetForm : function(){
        this.sku = '';
        this.name = ''; 
        this.description = ''; 
        this.quantity = ''; 
        this.price = ''; 
        this.photo_path = ''; 
        this.productId = 'none'; 
        $('#img-upload').attr('src','');
        $('input').val('')
      },
      notification: function(type, message){
          $.notify(message, type);
      },
      onSubmit: function(){
        if (typeof $("#imgInp")[0].files[0] == "undefined" && String(this.productId) == "none"){
          return this.notification('error', 'Please select image only.');
        }else if (typeof $("#imgInp")[0].files[0] == "undefined" && String(this.productId) != "none"){
          // update without image
          var payload = {
            sku : productController.sku,
            name : productController.name,
            description : productController.description,
            quantity : productController.quantity,
            price : productController.price,
            photo_path : productController.photo_path,
            productId : productController.productId
          };

          if (String(this.productId) == "" && String(this.productId) == String(null)){
            
          }else{
            axios.put(`http://localhost:${PORT}/products/update/` + productController.productId, payload)
              .then((res) => {
                if (res.data.status == "Success"){
                  productController.resetForm();
                  productController.fOnload();
                  return productController.notification('success', res.data.message);
                }else{
                  return productController.notification('error', res.data.message);
                }
              }).catch((err) => {
                  return productController.notification('error', 'Error while saving.');
                  console.log(err);
              });
          }

          return false;
          
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

                if (String(productController.productId) == "none"){
                  axios.post(`http://localhost:${PORT}/products/add`, payload)
                    .then((res) => {
                      if (res.data.status == "Success"){
                        productController.resetForm();
                        productController.fOnload();
                        return productController.notification('success', res.data.message);
                      }else{
                        return productController.notification('error', res.data.message);
                      }
                    }).catch((err) => {
                        productController.notification('error', 'Error while saving.');
                        console.log(err);
                    });
                }else{
                  axios.put(`http://localhost:${PORT}/products/update/` + productController.productId, payload)
                    .then((res) => {
                      if (res.data.status == "Success"){
                        productController.resetForm();
                        productController.fOnload();
                        return productController.notification('success', res.data.message);
                      }else{
                        return productController.notification('error', res.data.message);
                      }
                    }).catch((err) => {
                        return productController.notification('error', 'Error while saving.');
                        console.log(err);
                    });
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
      deleteProduct(id) {
        var con = confirm("Are you sure you want to deactivate this product?");

        if (!con){
          return false;
        }
        axios.delete(`http://localhost:${PORT}/products/delete/` + id)
            .then((res) => {
                if (res.data.status == "Success"){
                  this.resetForm();
                  this.fOnload();
                  return this.notification('success', res.data.message);
                }else{
                  return this.notification('error', res.data.message);
                }
            }).catch((err) => {
                this.notification('error', 'Error while deactivating product. Please contact system administrator');
            });
    },
    enableProduct(id) {
      var con = confirm("Are you sure you want to enable this product?");

      if (!con){
        return false;
      }
      axios.put(`http://localhost:${PORT}/products/update_status/` + id)
          .then((res) => {
              if (res.data.status == "Success"){
                this.resetForm();
                this.fOnload();
                return this.notification('success', res.data.message);
              }else{
                return this.notification('error', res.data.message);
              }
          }).catch((err) => {
              this.notification('error', 'Error while deactivating product. Please contact system administrator');
          });
  },
      getDetails: function(id){
          axios.get(`http://localhost:${PORT}/products/get/` + id)
              .then((response) => {
                  console.log(response)
                  this.sku = response.data.sku;
                  this.name = response.data.name; 
                  this.description = response.data.description; 
                  this.quantity = response.data.quantity; 
                  this.price = response.data.price; 
                  this.photo_path = response.data.photo_path; 
                  this.productId = response.data._id; 

                  $('#img-upload').attr('src', response.data.photo_path);
                  $("html, body").animate({ scrollTop: 0 }, "slow");
                  return false;
              }).catch((err) => {
                  this.notification('error', 'Error while requesting for data.');
              });

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

     // uploadFile(input);
  }

  $("#imgInp").change(function(){
      readURL(this);
  });

});