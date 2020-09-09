// este archivo tiene la configuracion de NodeMailer.

const nodemailer = require('nodemailer');
const pug = require('pug');     //convertir un template existente a mail.
const juice = require('juice'); //agregar estilos lineales
const htmlToText = require('html-to-text');     // crea una version de nuestro correo de html a texto
const util = require('util');
const emailConfig = require('../config/email'); //trae las credenciales

//configuracion desde nodemailer.com
// create reusable transporter object using the default SMTP transport
let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
    },
});

// send mail with defined transport object
let mailOptions = {
    from: 'UpTask <no-reply@uptask.com>',
    to: "correo@correo.com",
    subject: "Password Reset",
    text: "Hola",
    html: "<b>Hola mundo</b>", // html body
};

transport.sendMail(mailOptions);