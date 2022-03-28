const routes = require('express').Router();
const Cart = require('../models/cart');

routes.get('/', async (req, res) => {
    try {
        const cart = await Cart.find({ user: req.body.email });
        console.log(cart);
        res.json(cart);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: err.message });
    }
})

routes.patch('/add', (req, res) => {
    try {
        const cart = await Cart.find({ user: req.user.body });
        cart.products.push(req.user.body);
        await cart.save();
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: err.message });
    }
})


module.exports = routes;