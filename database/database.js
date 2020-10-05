const Sequelize = require('sequelize')

// dbname, user, password
const connection = new Sequelize('guiapress', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
})

module.exports = connection