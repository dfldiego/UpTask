//importar el modelo
const Proyectos = require('../models/Proyectos');

exports.proyectosHome = async (req, res) => {
    const proyectos = await Proyectos.findAll();    //se conecta al modelo

    //resultado se pasa a la vista.
    res.render("index", {
        nombrePagina: 'Proyectos',
        proyectos
    });
}

exports.formularioProyecto = (req, res) => {
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto'
    })
}

exports.nuevoProyecto = async (req, res) => {
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
        const proyecto = await Proyectos.create({ nombre });
        res.redirect('/');
    }
}

/**
 * // req.body -> Envia a la consola lo que el usuario escriba -> console.log(req.body);
 * //create -> metodo de sequelize para agregar a la BBDD
 */