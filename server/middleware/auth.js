const jwt = require('jsonwebtoken')
const User = require('../models/user');

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if (!token) return res.status(400).json({ msg: "Invalid Authentication" })

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(400).json({ msg: "Invalid Authentication" })

            req.user = user
            next()
        })
    }
    catch (err) {
        throw err;
    }
}

const authAdmin = async (req, res, next) => {
    try {
        console.log(req.user);
        const user = await User.findOne({
            _id: req.user._id
        })
        if (user.email !== "varshneyprateek20@gmail.com")
            return res.status(400).json({ msg: "Admin resources access denied" })
        next()
    }
    catch (err) {
        throw err;
    }
}

module.exports = { auth, authAdmin };