const passport = require('passport');

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