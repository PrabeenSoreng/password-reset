const User = require('../models/user');
const Mail = require('../helpers/mail');
const url = 'http://localhost:4200';

exports.forgotPassword = async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) res.status(404).json({ error: 'User not found' });
        const resetToken = ResetToken(30);
        user.pwdResetToken = resetToken;
        user.pwdResetExpiration = Date.now() + (60 * 60 * 1000);
        await user.save();

        const resetLink = `
            <h2> You requested for a password reset token </h2>
            <h4> Please click the link to reset the password </h4>

            <a href='${url}/reset-password/${resetToken}'> Reset Password </a>
        `;

        const options = {
            receiver: req.body.email,
            subject: 'Password Reset Token',
            html: resetLink
        };
        const result = await Mail.sendMail(options);

        res.status(200).json({ token: resetToken, result });
    } catch (err) {
        res.status(500).json(err);
    }
};

function ResetToken(num) {
    const string = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let str = '';
    let i = 0;
    while (i < num) {
        str += string.charAt(Math.floor(Math.random() * string.length));
        i++;
    }
    return str;
}