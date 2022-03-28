const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

const CartSchema = new Schema({
    products: [ProductSchema],
    count: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
})

module.exports = model('Cart', CartSchema);