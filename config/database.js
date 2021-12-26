module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'Enter your mysql password',
    DB: 'crud',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
