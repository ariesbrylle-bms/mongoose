const Order = require('../models/order.model');

exports.addOrder = function (req, res) {
  let order = new Product(
    {
      transactionNo: new Date().getFullYear() + '-' + new Date().getMonth() + new Date().getMilliseconds()+ '-' + new Date().getDay() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase(),
      dateOrdered: new Date(),
      orderDetails : req.body.orderDetails,
      orderedBy: req.body.orderedBy,
      payment : {
        amount: req.body.amount,
        paymentType: req.body.paymentType
      },
      billingAddress : {
        address1: req.body.bAddress1,
        address2: req.body.bAddress2,
        city: req.body.bcity,
        province: req.body.bprovince,
        zipCode: req.body.bzipCode,
        name: req.body.bname,
        mobileNo: req.body.bmobileNo,
      },
      shippingAddress : {
        address1: req.body.sAddress1,
        address2: req.body.sAddress2,
        city: req.body.scity,
        province: req.body.sprovince,
        zipCode: req.body.szipCode,
        name: req.body.sname,
        mobileNo: req.body.smobileNo,
      }
    }
  );

  order.save(function (err) {
      if (err) {
          return console.log(err);
      }
      res.send('Order Created successfully')
  })
};

exports.getAllOrders = function(req,res){
  Order.find({ status : "Active"}).populate({path : 'addedBy'}).exec(function(err,order){
    if(err){
      res.json(err);
    }

    res.json(order);
  });
};

exports.getOrderDetails = function(req,res){
  Order.findOne({_id : req.params.id}, function(err,order){
    if(err){
      return console.log(err);
    }

    res.json(order);
  });
};