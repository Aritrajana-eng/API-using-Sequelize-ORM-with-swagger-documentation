const dbconfig = require('../config/database')
const {Sequelize, DataTypes} = require('sequelize')


const sequelize = new Sequelize(
    dbconfig.DB,
    dbconfig.USER,
    dbconfig.PASSWORD,
    {
        host: dbconfig.HOST,
        dialect: dbconfig.dialect,
        operatorsAliases: false,
        logging: true,
        pool: {
            max: dbconfig.pool.max,
            min: dbconfig.pool.min,
            acquire: dbconfig.pool.acquire,
            idle: dbconfig.pool.idle
        }
    }
)

try {
    sequelize.authenticate().then(function () {
        console.log('Database Connection has been established successfully')
    })
} catch (e) {
    console.error('Unable to connect to the database', e)
}

const db = {}

db.Sequelize = sequelize
db.sequelize = sequelize

db.User = require('./user')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
.then(() => {
    console.log('Yes re-sync done')
})

module.exports = db
