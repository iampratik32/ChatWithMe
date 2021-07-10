var Sequelize = require('sequelize')
const db = require('../database/db')

const ServerChannel = db.define('ServerChannel',{
    name:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    server_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'servers',
            key: 'id'
        }
    }
},{
    tableName:'server_channels'
})

ServerChannel.sync({ alter: true })


module.exports = ServerChannel