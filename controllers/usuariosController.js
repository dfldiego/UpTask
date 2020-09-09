const Usuarios = require('../models/Usuarios');
const enviarEmail = require('../handlers/email');

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

        // crear una URL de confirmacion de cuenta
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;

        // crear el objeto de usuario
        const usuario = {
            email
        }

        // enviar email
        await enviarEmail.enviar({
            usuario: usuario,
            subject: 'Confirma tu cuenta UpTask',
            confirmarUrl: confirmarUrl,
            archivo: 'confirmar-cuenta' // template
        });

        // redirigir al usuario
        req.flash('correcto', 'Enviamos un correo, confirma tu cuenta');

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

exports.formRestablecerPassword = (req, res) => {
    res.render('reestablecer', {
        nombrePagina: 'Reestablecer tu contraseña'
    })
}

//cambia el estado de una cuenta.
exports.confirmarCuenta = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            email: req.params.correo
        }
    })

    // si no existe el usuario
    if (!usuario) {
        req.flash('error', 'No valido');
        res.redirect('/crear-cuenta');
    }

    usuario.activo = 1;
    await usuario.save();
    req.flash('correcto', 'Cuenta activada correctamente');
    res.redirect('/iniciar-sesion');

}

/*
Tiene que ver con las acciones para crear un usuario/cuenta
error: error.errors --> este arreglo lo vemos desde la consola.
*/