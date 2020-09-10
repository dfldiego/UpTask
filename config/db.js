const Sequelize = require('sequelize');

const sequelize = new Sequelize('z0sbu5tn4p7zy5hf', 'acu8iv9i9sd0129q', 'hrp5te6g6jfmhj69', {
    host: 'd1kb8x1fu8rhcnej.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
    port: '3306',
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