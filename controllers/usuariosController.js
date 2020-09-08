const Usuarios = require('../models/Usuarios');
// GET
exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear Cuenta en UpTask'
    })
}

exports.formIniciarSesion = (req, res) => {
    console.log(res.locals.mensajes);
    const { error } = res.locals.mensajes;
    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar Sesión en UpTask',
        error: error
    })
}

// POST
exports.crearCuenta = async (req, res) => {
    // leer los datos
    //console.log(req.body);
    const { email, password } = req.body;

    try {
        //crear el usuario  
        await Usuarios.create({ email, password })
        res.redirect('/iniciar-sesion');
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message))  //map() va a crear diferentes elementos de errores. Si tenemos 5 errores todos van a estar agrupados en 'error'
        res.render('crearCuenta', {
            mensajes: req.flash(),                                     //paso los errores a la vista
            nombrePagina: 'Crear Cuenta en UpTask',
            email: email,
            password: password
        })
    }


}


/*
Tiene que ver con las acciones para crear un usuario/cuenta
error: error.errors --> este arreglo lo vemos desde la consola.
*/