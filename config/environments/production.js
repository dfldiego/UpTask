module.exports = {
    PORT: process.env.PORT_MYSQL,
    DB: {
        username: process.env.USERNAME_PROD,
        password: process.env.PASSWORD_PROD,
        database: process.env.DATABASE_PROD,
        host: process.env.HOSTNAME_PROD,
        dialect: process.env.DIALECT
    }
}
