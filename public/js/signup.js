var PORT = 3400;
(function(){

  var signUp = new Vue({ // eslint-disable-line
        el: '#signUp',
        data: {
            postalCode: null,
            province: null,
            city: null,
            address2: null,
            address1: null,
            phoneNo: null,
            email: null,
            nameExt: null,
            lname: null,
            mname: null,
            fname: null,
            username: null,
            password: null
        },
        created: function(){
        },
        methods: {
            getUrlParameter: function getUrlParameter(sParam) {
                var sPageURL = decodeURIComponent(window.location.search.substring(1));


                var sURLVariables = sPageURL.split('&');


                var sParameterName = '';


                var i = 0;

                for(i = 0; i < sURLVariables.length; i++) {
                    sParameterName = sURLVariables[i].split('=');

                    if(sParameterName[0] === sParam) {
                        return sParameterName[1] === undefined ? true : sParameterName[1];
                    }
                }
            },
            notification: function(type, message){
                $.notify(message, type);
            },
            onSubmit: function(){
                if($('#password').val() !== $('#conPassword').val()){
                    $('#password').val('');
                    $('#conPassword').val('');
                    $('#password').focus();
                    return this.notification('warning', 'Password do not match');
                }
                var payload = {
                    postalCode: this.postalCode,
                    province: this.province,
                    city: this.city,
                    address2: this.address2,
                    address1: this.address1,
                    phoneNo: this.phoneNo,
                    email: this.email,
                    nameExt: this.nameExt,
                    lname: this.lname,
                    mname: this.mname,
                    fname: this.fname,
                    username: this.username,
                    password: this.password
                };

                axios.post(`http://localhost:${PORT}/signup`, payload)
                    .then((res) => {
                        if(String(res.data.status) === 'Success'){
                            document.location.href = this.getUrlParameter('return');
                            return this.notification('success', res.data.message);
                        }
                        // if (res.data.status == "Success"){
                        //   window.location.href = res.data.url;
                        // }else{
                        //   this.notification('error', res.data.message);
                        // }
                    }).catch((err) => {
                        // this.notification('error', 'Error while saving.');
                        console.log(err);
                    });

            }
        }
    });

})();
