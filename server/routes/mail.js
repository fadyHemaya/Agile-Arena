const nodemailer = require('nodemailer')


require('dotenv').config({ path: __dirname + '/.env' })
let mailer = {

    sendMail: function (recipient, subject, text) {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                clientId: process.env['clientID'],
                clientSecret: process.env['clientSecret']
            }

        })

        var mailOptions = {
            from: 'Agile Arena <guc.agile.arena@gmail.com>',
            to: recipient,
            subject: subject,
            text: text,
            auth: {
                user: 'guc.agile.arena@gmail.com',
                refreshToken: process.env['refreshToken']
            }
        }

        transporter.sendMail(mailOptions, function (err, res) {
            if (err) {
                console.log("Error");
            } else {
                console.log('Email Sent');
            }
        })

    }
}
module.exports = mailer