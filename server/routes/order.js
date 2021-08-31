const routes = require('express').Router();
const Order = require('../models/order');
const { auth } = require('../middleware/auth');
const Users = require('../models/user');

routes.get('/', auth, async (req, res) => {
    try {
        const order = await Order.find({ user_id: req.user._id });

        res.json(order);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: err.message });
    }
})

routes.post('/', auth, async (req, res) => {
    try {
        const user = await Users.findById(req.user._id);
        if (!user) return res.status(400).json({ msg: "User does not exist." });
        const { cart, OrderID, address } = req.body;
        const { _id, name, email } = user;
        const newOrder = new Order({
            user_id: _id, name, email, cart, OrderID, address
        })
        await newOrder.save();
        res.json({ msg: "Order Succes!" })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: err.message });
    }
})

routes.get('/:id', auth, (req, res) => {
    const { id } = req.params;
    Order.findById(id)
        .then((order) => {
            res.json(order);
        })
        .catch((err) => {
            res.status(422).json(err);
        })
})


module.exports = routes;