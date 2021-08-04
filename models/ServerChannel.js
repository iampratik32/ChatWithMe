var Sequelize = require('sequelize')
const db = require('../database/db')
const Chat = require('./Chat')

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

ServerChannel.hasMany(Chat,{
    foreignKey: 'channel_id',
    onDelete:'cascade'
})


module.exports = ServerChannel