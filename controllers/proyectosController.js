//importar el modelo
const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

// FIND ALL
exports.proyectosHome = async (req, res) => {
    /* console.log(res.locals.usuario); */
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({
        where: {
            usuarioId: usuarioId
        }
    });    //se conecta al modelo

    //resultado se pasa a la vista.
    res.render("index", {
        nombrePagina: 'Proyectos',
        proyectos
    });
}

//FIND ALL
exports.formularioProyecto = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({
        where: {
            usuarioId: usuarioId
        }
    });    //se conecta al modelo

    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    })
}

//FIND ALL-CREATE
exports.nuevoProyecto = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({
        where: {
            usuarioId: usuarioId
        }
    });    //se conecta al modelo

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
            errores,
            proyectos
        })
    } else {
        //si no hay errores -> insertar en la BBDD
        const usuarioId = res.locals.usuario.id;
        await Proyectos.create({ nombre, usuarioId });
        res.redirect('/');
    }
}

// FIND ALL - FIND ONE
exports.proyectoPorUrl = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = Proyectos.findAll({
        where: {
            usuarioId: usuarioId
        }
    });    //se conecta al modelo

    const proyectoPromise = Proyectos.findOne({
        where: {
            url: req.params.url,
            usuarioId: usuarioId
        }
    });
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);
    // Consultar tareas del proyecto actual
    const tareas = await Tareas.findAll({
        where: {
            proyectoId: proyecto.id
        },
        /* include: [  //agrega info del modelo Proyecto en tareas -> similar a join.
            { model: Proyectos }
        ] */
    });
    //console.log(tareas);

    //si no hay proyecto
    if (!proyecto) return next();
    //render a la vista
    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos,
        tareas
    })
}

// FIND ALL - FIND ONE
exports.formularioEditar = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = Proyectos.findAll({
        where: {
            usuarioId: usuarioId
        }
    });    //se conecta al modelo

    const proyectoPromise = Proyectos.findOne({
        where: {
            id: req.params.id,
            usuarioId: usuarioId
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    //render a la vista
    res.render('nuevoProyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    })
}

// FIND ALL - UPDATE
exports.actualizarProyecto = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({
        where: {
            usuarioId: usuarioId
        }
    });    //se conecta al modelo

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
            errores,
            proyectos
        })
    } else {
        //si no hay errores -> insertar en la BBDD
        await Proyectos.update({ nombre: nombre }, { where: { id: req.params.id } });
        res.redirect('/');
    }
}

// DESTROY
exports.eliminarProyecto = async (req, res, next) => {
    //req -> usar query o params
    console.log(req.query);
    const { urlProyecto } = req.query;
    const resultado = await Proyectos.destroy({ where: { url: urlProyecto } })

    if (!resultado) {
        return next();
    }

    res.status(200).send('Proyecto eliminado correctamente');
}