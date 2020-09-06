const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('../models/Proyectos');
const bcrypt = require('bcrypt-nodejs');

const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Agrega un Correo Válido'
            },
            notEmpty: {
                msg: 'Ingrese un email'
            }
        },
        unique: {
            args: true,
            msg: 'Usuario Ya Registrado'
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El password no puede ir vacio'
            }
        }
    }
}, {
    hooks: {
        beforeCreate(usuario) {
            /* console.log('creando nuevo usuario')
            console.log(usuario); */
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
        }
    }
});

//Cada usuario puede crear muchos proyectos.
Usuarios.hasMany(Proyectos);

module.exports = Usuarios;

/**
 * allowNull: false --> el campo no puede ir vacio.
 * Cada usuario puede crear proyectos.
 * beforeCreate(usuario) --> ejecutado antes de ingresar los datos a la BBDD
 */