const Sequelize = require('sequelize');
const db = require('../config/db');

//importar slug
const slug = require('slug');

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
}, {
    hooks: {
        beforeCreate(proyecto) {
            const url = slug(proyecto.nombre).toLowerCase();
            proyecto.url = url;
        }
    }
});

module.exports = Proyectos;

/*
Proyecto -> nombre del modelo
define -> metodo para definir el modelo de BBDD
proyecto -> nombre de la BBDD
sync -> para generar tablas automaticamente
beforeCreate -> una funcion que se puede ejecutar antes que se inserte algo en la BBDD
slug -> toma una cadena de texto. Ej: “Tienda Virtual” y la convierte a “Tienda-Virtual”
*/