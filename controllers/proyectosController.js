//importar el modelo
const Proyectos = require('../models/Proyectos');
//importar slug
const slug = require('slug');

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
        const url = slug(nombre).toLowerCase();
        const proyecto = await Proyectos.create({ nombre, url });
        res.redirect('/');
    }
}


/**
 * // req.body -> Envia a la consola lo que el usuario escriba -> console.log(req.body);
 * //create -> metodo de sequelize para agregar a la BBDD
 * //slug -> toma una cadena de texto. Ej: “Tienda Virtual” y la convierte a “Tienda-Virtual”
 */