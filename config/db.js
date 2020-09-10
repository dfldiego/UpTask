const Sequelize = require('sequelize');
const { PORT, DB } = require('./environments');
/* console.log(PORT);  //sale 3306 */

const sequelize = new Sequelize(DB.database, DB.username, DB.password, {
    host: DB.host,
    dialect: DB.dialect,
    port: PORT,
    operatorsAliases: '0',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = sequelize;