require("dotenv").config();
//importando los ambientes
const PRODUCTION = require("./production");
const DEVELOPMENT = require("./development");
/*
extraer una variable de entorno llamada NODE_ENV que es el environment 
en el que se encuentra nuestro software en este momento.
Esta variable la configuran los sistemas operativos donde esta desplegada
nuestra app automaticamente.
*/
const { NODE_ENV } = process.env;
//Por defecto asignamos ambiente -> DEVELOPMENT
let currentEnv = DEVELOPMENT;
/**
 * Verificamos en que environment estamos
 */
if (NODE_ENV === 'production') {
    currentEnv = PRODUCTION;
}

module.exports = currentEnv;
