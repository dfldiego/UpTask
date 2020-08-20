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