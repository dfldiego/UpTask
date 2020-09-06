const Usuarios = require('../models/Usuarios');
// GET
exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear Cuenta en UpTask'
    })
}

// POST
exports.crearCuenta = (req, res) => {
    // leer los datos
    //console.log(req.body);
    const { email, password } = req.body;
    //crear el usuario  
    Usuarios.create({
        email,
        password
    })
        .then(() => {
            res.redirect('/iniciar-sesion')
        });
}


/*
Tiene que ver con las acciones para crear un usuario/cuenta
*/