const bcrypt = require('bcryptjs');
const Joi = require('joi');

const User = require('../models/user');
const Mail = require('../helpers/mail');

exports.resetPassword = async(req, res) => {
    try {
        const schema = Joi.object().keys({
            password: Joi.string()
                .regex(
                    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@^$#&!%*?&])[A-Za-zd$#^@%&!%*?&].{5,30}/
                )
                .required()
        });
        const { error, value } = Joi.validate(req.body, schema);
        if (error && error.details) {
            return res.status(400).json({ message: error.details });
        }

        const user = await User.findOne({
            pwdResetToken: req.params.token,
            pwdResetExpiration: { $gt: Date.now() }
        });

        if (!user) res.status(500).json({ message: 'Password reset token as expired or is invalid' });

        return bcrypt.hash(value.password, 10, async(err, hash) => {
            if (err) res.status(500).json({ message: 'Error hashing the password' });
            user.password = hash;
            user.pwdResetToken = undefined;
            user.pwdResetExpiration = undefined;
            user.save();

            const confirmation = `
            <h4> This is a confirmation that you changed the password for ${user.email}</h4>
        `;

            const options = {
                receiver: user.email,
                subject: 'Password Reset Confirmation',
                html: confirmation
            };
            const result = await Mail.sendMail(options);
            res.status(200).json({ message: 'Password reset was succussful', result });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};