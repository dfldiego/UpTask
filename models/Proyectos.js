const Sequelize = require('sequelize');
const db = require('../config/db');


const Proyectos = db.define('proyecto', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING
    },
    url: {
        type: Sequelize.STRING
    }
});

module.exports = Proyectos;

/*
Proyecto -> nombre del modelo
define -> metodo para definir el modelo de BBDD
proyecto -> nombre de la BBDD
sync -> para generar tablas automaticamente
*/