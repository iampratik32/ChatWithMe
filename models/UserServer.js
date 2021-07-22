var Sequelize = require('sequelize')
const db = require('../database/db')

const UserServer = db.define('UserServer',{
    server_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'servers',
            key: 'id'
        }
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
},{
    tableName:'user_servers'
})

UserServer.sync({ alter: true })



module.exports = UserServer