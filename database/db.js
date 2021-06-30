const config = require('./config')

const { Sequelize } = require('sequelize')

const db = new Sequelize(config.Database, config.USER, config.Password, {
    host: config.Host,
    dialect: config.dialect,
    pool: config.pool,
    logging: false
})

db.authenticate().then(()=>console.log('Connected')).catch((err)=>console.log(err))

module.exports = db