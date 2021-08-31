const routes = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

routes.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "please add all the fields" });
    }

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(422).json({ error: "email is not correct" });
            }
            bcrypt.compare(password, user.password)
                .then((match) => {
                    if (match) {
                        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                        res.send({ token, user });
                    }
                    else {
                        res.status(422).json({ error: "password not matched" });
                    }
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err))
})

routes.post('/signup', (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(422).json({ error: 'Please add all the fields' });
    }

    User.findOne({ email })
        .then((user) => {
            if (user) {
                return res.status(422).json({ error: 'This email already exist' });
            }

            bcrypt.hash(password, 12)
                .then((hashedpassword) => {
                    const user = new User({
                        name,
                        email,
                        password: hashedpassword
                    })

                    user.save()
                        .then((user) => {
                            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                            res.send({ user, token });
                        })
                        .catch((err) => console.log(err))
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
})

module.exports = routes;