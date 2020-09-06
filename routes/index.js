const express = require('express');
const router = express.Router();

//importar express validator
const { body } = require('express-validator');

//importamos el controlador
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');

module.exports = function () {

    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto', body('nombre').not().isEmpty().trim().escape(), proyectosController.nuevoProyecto);

    //listar proyecto
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);

    // Actualizar el proyecto
    router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
    router.post('/nuevo-proyecto/:id', body('nombre').not().isEmpty().trim().escape(), proyectosController.actualizarProyecto);

    // Eliminar el proyecto
    router.delete('/proyectos/:url', proyectosController.eliminarProyecto);

    // Agregar una tarea
    router.post('/proyectos/:url', tareasController.agregarTarea);

    // Actualizar una tarea
    router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);

    // Eliminar una tarea
    router.delete('/tareas/:id', tareasController.eliminarTarea);

    //Crear nueva cuenta
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);


    return router;
}

/**
 * patch -> similar a update , cambia una parte del registro. update cambia todo el registro.
 * body -> xq lo que queremos validar en el create esta en el req.body
 * check -> funcion con los metodos para validar.
 * not().isEmpty() -> para que no haya campo vacio
 * trim() -> para que elimine espacios en blanco al principio y al final.
 * escape() -> para eliminar campos con simbolos raros.
 */
