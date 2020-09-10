module.exports = {
    PORT: process.env.PORT_MYSQL,
    DB: {
        username: process.env.USERNAME_DEV,
        password: process.env.PASSWORD_DEV,
        database: process.env.DATABASE_DEV,
        host: process.env.HOSTNAME_DEV,
        dialect: process.env.DIALECT
    }
}
