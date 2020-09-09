const express = require('express');
const router = express.Router();

//importar express validator
const { check } = require('express-validator');

//importamos el controlador
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

module.exports = function () {

    router.get('/',
        authController.usuarioAutenticado,
        proyectosController.proyectosHome,
    );
    router.get('/nuevo-proyecto',
        authController.usuarioAutenticado,
        proyectosController.formularioProyecto
    );
    router.post('/nuevo-proyecto',
        authController.usuarioAutenticado,
        check('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto
    );

    //listar proyecto
    router.get('/proyectos/:url',
        authController.usuarioAutenticado,
        proyectosController.proyectoPorUrl,
    );

    // Actualizar el proyecto
    router.get('/proyecto/editar/:id',
        authController.usuarioAutenticado,
        proyectosController.formularioEditar,
    );
    router.post('/nuevo-proyecto/:id',
        authController.usuarioAutenticado,
        check('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto
    );

    // Eliminar el proyecto
    router.delete('/proyectos/:url',
        authController.usuarioAutenticado,
        proyectosController.eliminarProyecto,
    );

    // Agregar una tarea
    router.post('/proyectos/:url',
        authController.usuarioAutenticado,
        tareasController.agregarTarea,
    );

    // Actualizar una tarea
    router.patch('/tareas/:id',
        authController.usuarioAutenticado,
        tareasController.cambiarEstadoTarea,
    );

    // Eliminar una tarea
    router.delete('/tareas/:id',
        authController.usuarioAutenticado,
        tareasController.eliminarTarea,
    );

    //Crear nueva cuenta
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', usuariosController.crearCuenta);

    // Iniciar sesión
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);

    // Cerrar Sesión
    router.get('/cerrar-sesion', authController.cerrarSesion);

    // reestablecer contraseña
    router.get('/reestablecer', usuariosController.formRestablecerPassword);
    router.post('/reestablecer', authController.enviarToken);

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
