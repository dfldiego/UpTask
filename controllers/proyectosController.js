//importar el modelo
const Proyectos = require('../models/Proyectos');

exports.proyectosHome = (req, res) => {
    res.render("index", {
        nombrePagina: 'Proyectos'
    });
}

exports.formularioProyecto = (req, res) => {
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto'
    })
}

exports.nuevoProyecto = (req, res) => {
    //validar campos vacios -> sin librerias.
    const { nombre } = req.body;
    let errores = [];

    if (!nombre) {
        errores.push({ 'texto': 'Agrega un nombre al proyecto' });
    }
    //si hay errores
    if (errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores
        })
    } else {
        //si no hay errores -> insertar en la BBDD
        Proyectos.create({ nombre })
            .then(() => console.log('Insertado correctamente'))
            .catch(error => console.log(error))
    }
}


/**
 * // req.body -> Envia a la consola lo que el usuario escriba -> console.log(req.body);
 */