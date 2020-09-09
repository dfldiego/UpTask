const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');   //utilidad que nos permite crear tokens

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
    console.log(resetUrl);  // url del token
}

exports.resetPassword = async (req, res) => {
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