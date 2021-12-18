const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();
const AuthRoute = require('./routes/auth');
const ProductRoute = require('./routes/products');
const OrderRoute = require('./routes/order');
require('dotenv').config()

var corsOptions = {
    origin: 'http://localhost:3000/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        return app.listen({ port: PORT })
    })
    .then(() => console.log('Server Running'))
    .catch((err) => console.log(err))


app.get('/', (req, res) => {
    res.send('Welcome')
})

app.use('/auth', AuthRoute);
app.use('/products', ProductRoute);
app.use('/order', OrderRoute);