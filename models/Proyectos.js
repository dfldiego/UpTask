const Sequelize = require('sequelize');
const db = require('../config/db');
const slug = require('slug');
const shortid = require('shortid');

const Proyectos = db.define('proyecto', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING(100)
    },
    url: {
        type: Sequelize.STRING(100)
    }
}, {
    hooks: {
        beforeCreate(proyecto) {
            const url = slug(proyecto.nombre).toLowerCase();
            proyecto.url = `${url}-${shortid.generate()}`;
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