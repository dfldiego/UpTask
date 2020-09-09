const passport = require('passport');
const Usuarios = require('../models/Usuarios');

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
        res.render('reestablecer', {
            nombrePagina: 'Reestablecer tu Contraseña',
            mensajes: req.flash()
        })
    }
}