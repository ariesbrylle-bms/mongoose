const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;

var SchemaTypes = mongoose.Schema.Types;

let OrderSchema = new Schema({
  transactionNo: {type: String, required: true, max: 25},
  dateOrdered: {
    required: true,
    type: Date
  },
  orderDetails : [{
    productId : {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product', 
      required: true
    },
    qty : {type: Number, required: true, max: 4},
    price : {
      type: SchemaTypes.Double, required: true
    },
    totalAmount : {
      type: SchemaTypes.Double, required: true
    }
  }],
  orderedBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  },
  payment : {
    or: {type: String, required: false, max: 25},
    amount: {type: SchemaTypes.Double, required: true},
    paymentDate: {type: Date, required: false, default : Date.now},
    paymentType: {type: String, required: false, max: 25}
  },
  status : {type : String, required : true, default : 'Active'},
  deliveryStatus : {
    status : {
      type: String, 
      required: false, 
      max: 50, 
      default : ''
    },
    dateDelivered : {
      required: false,
      type: Date
    },
    taggedBy : {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: false
    },
    dateTagged : {
      required: false,
      type: Date
    }
  },
  billingAddress : {
    address1: {type: String, required: true, max: 50},
    address2: {type: String, required: false, max: 50},
    city: {type: String, required: true, max: 50},
    province: {type: String, required: true, max: 10},
    zipCode: {type: Number, required: true, max: 9999},
    name: { type: String, required: true, max: 100},
    mobileNo: { type: String, required: true, max: 15}
  },
  shippingAddress : {
    address1: {type: String, required: true, max: 50},
    address2: {type: String, required: false, max: 50},
    city: {type: String, required: true, max: 50},
    province: {type: String, required: true, max: 10},
    zipCode: {type: Number, required: true, max: 9999},
    name: { type: String, required: true, max: 100},
    mobileNo: { type: String, required: true, max: 15}
  }
});

// Export the model
module.exports = mongoose.model('Order', OrderSchema);
