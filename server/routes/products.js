const routes = require('express').Router();
const { auth, authAdmin } = require('../middleware/auth');
const Product = require('../models/products');

routes.get('/', (req, res) => {
    Product.find()
        .then((products) => {
            res.json(products);
        })
        .catch((err) => {
            console.log(err);
            res.status(422).json(err);
        })
})

routes.post('/', auth, authAdmin, (req, res) => {
    const { name, description, price, Image } = req.body;
    if (!name || !description || !price || !Image) {
        res.status(422).json({ error: "Please fill all the fields" });
    }
    const product = new Product({
        name,
        description,
        price,
        Image
    })
    product.save()
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            res.status(422).json(err);
        })
})

routes.delete('/:id', auth, authAdmin, (req, res) => {
    const { id } = req.params;
    Product.findOneAndDelete({ _id: id })
        .then(() => {
            res.json('Product Deleted');
        })
        .catch((err) => {
            res.status(422).json(err);
        })
})

routes.get('/:id', auth, (req, res) => {
    const { id } = req.params;
    Product.findById(id)
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            res.status(422).json(err);
        })
})

module.exports = routes;