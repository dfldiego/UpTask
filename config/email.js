// Este archivo tiene la configuracion de Mailtrap.io
// info sacada de Mailtrap.io Credentials SMTP

require('dotenv').config();
module.exports = {
    user: process.env.USER_MAILTRAP,
    pass: process.env.PASS_MAILTRAP,
    host: 'smtp.mailtrap.io',
    port: '2525'
}