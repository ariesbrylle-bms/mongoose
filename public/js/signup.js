var PORT = 3400;
(function(){
  
  var signUp = new Vue({ // eslint-disable-line
      el: '#signUp',
      data: {
        postalCode : null,
        province : null,
        city : null,
        address2 : null,
        address1 : null,
        phoneNo : null,
        email : null,
        nameExt : null,
        lname : null,
        mname : null,
        fname : null,
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
            postalCode : this.postalCode,
            province : this.postalCode,
            city : this.postalCode,
            address2 : this.postalCode,
            address1 : this.postalCode,
            phoneNo : this.postalCode,
            email : this.postalCode,
            nameExt : this.postalCode,
            lname : this.postalCode,
            mname : this.postalCode,
            fname : this.postalCode,
            username : this.postalCode,
            password : this.postalCode
          };

          axios.post(`http://localhost:${PORT}/signup`, payload)
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

})();
