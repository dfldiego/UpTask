const Sequelize = require('sequelize');
const db = require('../config/db');
//importamos la tabla Proyectos.
const Proyectos = require('./Proyectos');

const Tareas = db.define('tareas', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    tarea: Sequelize.STRING(100),
    estado: Sequelize.INTEGER(1)
});
//una Tarea pertenece a un Proyecto.
Tareas.belongsTo(Proyectos);
//si colocamos esta deberia ir en el otro proyecto. Proyectos.hasMany(Tareas);

module.exports = Tareas;