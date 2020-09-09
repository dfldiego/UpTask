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

// generar HTML
const generarHTML = (archivo, opciones = {}) => {
    const html = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`, opciones);
    return juice(html);
}

exports.enviar = async (opciones) => {  //pasamos las opciones desde el authController -> enviarToken
    const html = generarHTML(opciones.archivo, opciones);
    const text = htmlToText.fromString(html);
    // send mail with defined transport object
    let opcionesEmail = {
        from: 'UpTask <no-reply@uptask.com>',
        to: opciones.usuario.email,
        subject: opciones.subject,
        text: text,
        html: html
    };

    const enviarEmail = util.promisify(transport.sendMail, transport);  // util -> si hay algo que no soporte async y await(promises), lo convierta a async y await
    return enviarEmail.call(transport, opcionesEmail);
}

/**
 * transport.sendMail -> es el que envia el email
 *
 */