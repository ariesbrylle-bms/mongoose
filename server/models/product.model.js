const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;

var SchemaTypes = mongoose.Schema.Types;

let ProductSchema = new Schema({
    sku: { type: String, required: true, max: 25 },
    name: { type: String, required: true, max: 50 },
    description: { type: String, required: true, max: 10000 },
    photo_path: { type: String, required: true, max: 100 }, // eslint-disable-line
    quantity: { type: Number, required: true },
    price: { type: SchemaTypes.Double, required: true },
    status: { type: String, required: true, default: 'Active' },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    dateAdded: {
        required: false,
        type: Date
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    dateUpdated: {
        required: false,
        type: Date }
});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);