const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const crypto = require('crypto');   //utilidad que nos permite crear tokens
const bcrypt = require('bcrypt-nodejs');
const enviarEmail = require('../handlers/email');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

// Funcion para revisar si el usuario esta logueado o no.
exports.usuarioAutenticado = (req, res, next) => {
    // si el usuario esta autenticado, adelante.
    if (req.isAuthenticated()) {
        return next();
    }

    // sino está autenticado, redirigir al formulario.
    return res.redirect('/iniciar-sesion');
}

// Funcion para cerrar sesión
exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion'); // al cerrar sesión nos lleva al login
    })
}

// genera un token si el usuario es valido
exports.enviarToken = async (req, res) => {
    // verificar que el usuario existe
    const usuario = await Usuarios.findOne({
        where: {
            email: req.body.email
        }
    });

    //si no existe el usuario
    if (!usuario) {
        req.flash('error', 'No existe esa cuenta');
        res.redirect('/reestablecer');
    }

    // usuario existe
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;    //una hora
    /* console.log(token);
    console.log(expiracion); */
    // guardarlos en la BBDD -> el usuario con token y expiracion
    await usuario.save();

    //url de reset
    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;
    /* console.log(resetUrl);  // url del token */

    // vamos a enviar el token hacia el usuario.Envia el correo con el token
    // aqui vamos a comunicar el enviar(handlers/email.js) con este enviarToken.
    await enviarEmail.enviar({  //enviamos parametros desde este archivo a handlers/email.js
        usuario: usuario,
        subject: 'Password Reset',
        resetUrl: resetUrl,
        archivo: 'reestablecer-password'    //mismo nombre que archivo pug
    });
}

exports.validarToken = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token
        }
    });
    console.log(usuario);

    // si no encuentra el usuario 
    if (!usuario) {
        req.flash('error', 'No Válido');
        res.redirect('/reestablecer');
    }

    // formulario para generar el password (aqui el usuario ya es valido)
    res.render('resetPassword', {
        nombrePagina: 'Reestablecer Contraseña'
    })
}

//cambia el password por uno nuevo
exports.actualizarPassword = async (req, res) => {

    // verifica el token valido y tambien la fecha de expiracion.
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token,
            expiracion: {
                [Op.gte]: Date.now()
            }
        }
    });

    // verificamos si el usuario existe
    /* console.log(usuario); */
    if (!usuario) {
        req.flash('error', 'No Válido');
        res.redirect('/reestablecer');
    }

    // hashear el nuevo password
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    usuario.token = null;
    usuario.expiracion = null;

    // guardamos el nuevo password
    await usuario.save();

    req.flash('correcto', 'Tu password se ha modificado correctamente');
    res.redirect('/iniciar-sesion');
}