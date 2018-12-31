const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');

exports.sendMail = (options) => {
    return new Promise((res, rej) => {
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'puqatzwessuehy6a@ethereal.email',
                pass: '7ce1dCkaSRxGh6mPGf'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const htmlText = htmlToText.fromString(options.html, {
            wordwrap: 130
        });

        let mailOptions = {
            from: 'App Admin <no-reply@test.com>', // sender address
            to: options.receiver, // list of receivers
            subject: options.subject, // Subject line
            text: htmlText, // plain text body
            html: options.html // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) return rej(error);
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            return res({
                message: 'Reset token has been sent'
            });
        });
    });
}