const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    }
})

module.exports = model('Product', ProductSchema);