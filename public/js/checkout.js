var PORT = 3400;
(function(){

  var checkoutController = new Vue({ // eslint-disable-line
        el: '#login-box',
        data: {
            name: null,
            address: null,
            mobileNo: null,
            bAddress1: null,
            bAddress2: null,
            bCity: null,
            bProvince: null,
            bZip: null,
            bName: null,
            bMobile: null,
            sAddress1: null,
            sAddress2: null,
            sCity: null,
            sProvince: null,
            sZip: null,
            sName: null,
            sMobile: null,
            scartData: [],
            total: 0
        },
        created: function(){
            this.getUserInformation();
            this.getCart();
        },
        filters: {
            toCurrency: function(value) {
                if(typeof value !== 'number') {
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
            addToCart: function(id, price, name, photo, input){
                var qty = input.target.value;

                var data = {
                    productId: id,
                    qty: parseInt(qty),
                    price: price,
                    name: name,
                    photo: photo
                };

                axios.post(`http://localhost:${PORT}/cart/data`, data)
                    .then((response) => {
                        var ctr = 0;

                        if(response.data.length > 0){
                            for(var i = 0; i < response.data.length; i++){
                                ctr += response.data[i].qty;
                            }
                        }

                        $('#cartBadge').html(ctr);

                        this.getCart();
                    }).catch((err) => {
                        this.products = [];
                        // this.notification('error', 'Error while requesting for data.');
                    });
            },
            getCart: function(){
                axios.get(`http://localhost:${PORT}/cart`)
                    .then((response) => {
                        var ctr = 0;
                        this.scartData = response.data;
                        console.log(this.scartData);
                        var tempTotal = 0;
                        if(response.data.length > 0){
                            for(var i = 0; i < response.data.length; i++){
                                ctr += response.data[i].qty;
                                tempTotal += parseFloat(response.data[i].qty * response.data[i].price);
                            }
                        }

                        this.total = tempTotal;
                        $('#totalAmounts').html(this.toCurrency(tempTotal));
                        $('#cartBadge').html(ctr);
                    }).catch((err) => {
                        this.products = [];
                    //this.notification('error', 'Error while requesting for data.');
                    });
            },
            toCurrency: function(value) {
                if(typeof value !== 'number') {
                    value = parseFloat(value);
                }
                var formatter = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'Php',
                    minimumFractionDigits: 0
                });
                return formatter.format(value);
            },
            notification: function(type, message){
                $.notify(message, type);
            },
            getUserInformation: function(){
                axios.get(`http://localhost:${PORT}/user/get`)
                    .then((response) => {
                        if(String(response.data.status) === 'Error1'){
                            document.location.href = '/';
                            return this.notification('error', response.data.message);
                        }

                        console.log(response.data);
                        this.name = response.data.name.fname + ' ' +  response.data.name.mname + ' ' + response.data.name.lname; // eslint-disable-line
                        this.address = response.data.address.address1 + ' ' + response.data.address.address2 + ' ' + response.data.address.city + ' ' + response.data.address.province + ' ' + response.data.address.zipCode; // eslint-disable-line
                        this.mobileNo = response.data.mobileNo;
                        this.bAddress1 = response.data.address.address1;
                        this.bAddress2 = response.data.address.address2;
                        this.bCity = response.data.address.city;
                        this.bProvince = response.data.address.province;
                        this.bZip = response.data.address.zipCode;
                        this.bName = this.name;
                        this.bMobile = response.data.mobileNo;
                        this.sAddress1 = response.data.address.address1;
                        this.sAddress2 = response.data.address.address2;
                        this.sCity = response.data.address.city;
                        this.sProvince = response.data.address.province;
                        this.sZip = response.data.address.zipCode;
                        this.sName = this.name;
                        this.sMobile = response.data.mobileNo;

                    }).catch((err) => {
                        this.products = [];
                        //this.notification('error', 'Error while requesting for data.');
                    });
            }
        }
    });

})();
