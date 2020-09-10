// Este archivo tiene la configuracion de Mailtrap.io
// info sacada de Mailtrap.io Credentials SMTP

require('dotenv').config();
module.exports = {
    user: process.env.USER_GMAIL,
    pass: process.env.PASS_GMAIL,
    /* host: 'smtp.mailtrap.io',
    port: '2525' */
}