const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {type: String, required: true, max: 25},
    password: {type: String, required: true, max: 50},
    userType: {
      type: String, 
      required: true, 
      max: 50, 
      default : 'Customer'
    },
    name: {
      fname: {type: String, required: true, max: 50},
      mname: {type: String, required: false, max: 50},
      lname: {type: String, required: true, max: 50},
      nameExt: {type: String, required: false, max: 10},
    },
    photo_path: {type: String, required: false, max: 100},
    emailAddress: {type: String, required: true, max: 100},
    mobileNo: {type: String, required: true, max: 15},
    address: {
      address1: {type: String, required: true, max: 50},
      address2: {type: String, required: false, max: 50},
      city: {type: String, required: true, max: 50},
      province: {type: String, required: true, max: 10},
      zipCode: {type: Number, required: true, max: 9999}
    },
    status: {type: String, required: true, default : 'Active'},
    addedBy: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: false
    },
    dateAdded: {
      required: false,
      type: Date,
      default: Date.now
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: false
    },
    dateUpdated: {
      required: false,
      type: Date,
      default: Date.now},
});

// Export the model
module.exports = mongoose.model('User', UserSchema);