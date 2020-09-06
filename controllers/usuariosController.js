const Usuarios = require('../models/Usuarios');
// GET
exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear Cuenta en UpTask'
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
        console.log(error);
        res.render('crearCuenta', {
            errores: error.errors,
            nombrePagina: 'Crear Cuenta en UpTask'
        })
    }


}


/*
Tiene que ver con las acciones para crear un usuario/cuenta
error: error.errors --> este arreglo lo vemos desde la consola.
*/