const Joi = require('joi');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.login = async(req, res) => {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(30).required()
    });

    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) res.status(400).json({ message: error.details });

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) return res.status(404).json({ message: 'Email not found.' });

            return bcrypt.compare(value.password, user.password)
                .then(result => {
                    console.log(result);
                    if (!result) res.status(500).json({ message: 'Password is incorrect.' });

                    return res.status(200).json({ message: 'Login successful', user });
                });
        })
        .catch(err => res.status(500).json({ message: 'Error occured.' }));
}