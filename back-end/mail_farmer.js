const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'venkateshamulraj@gmail.com',
        pass: 'pwghkecichgstvxo'
    }
});

// export the sendMail function
const sendFarmerMail = (to, sub, msg) => {
    transporter.sendMail({
        to: to,
        subject: sub,
        html: msg
    });
};

module.exports = sendFarmerMail;
