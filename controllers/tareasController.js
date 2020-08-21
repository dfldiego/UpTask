const Proyecto = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.agregarTarea = async (req, res, next) => {
    //Obtenemos el proyecto actual
    const proyecto = await Proyecto.findOne({ where: { url: req.params.url } });
    //console.log(proyecto);
    //console.log(req.body);

    // Leer el valor del input
    const { tarea } = req.body;

    // estado=0 -> tareas incompletas por default y ID de proyecto. 
    const estado = 0;
    const proyectoId = proyecto.id;

    // Insertar en la BBDD
    const resultado = Tareas.create({ tarea, estado, proyectoId });
    if (!resultado) {
        return next();
    }
    //Direccionar
    res.redirect(`/proyectos/${req.params.url}`);
}

exports.cambiarEstadoTarea = async (req, res) => {
    //console.log(req.params) //{ id: '1' }
    const { id } = req.params;
    const tarea = await Tareas.findOne({ where: { id: id } });  //tarea con id=1
    //console.log(tarea); //dataValues: { id: 1, tarea: 'Seleccionar Colores', estado: 0, proyectoId: 1 }

    //cambiar el estado
    let estado = 0;
    if (tarea.estado === estado) {
        estado = 1;
    }
    tarea.estado = estado;

    //guardamos cambio en BBDD
    const resultado = await tarea.save();

    if (!resultado) {
        return next();
    }

    res.status(200).send("Estado Actualizado");
}

exports.eliminarTarea = async (req, res) => {
    res.send('Eliminando...')
}