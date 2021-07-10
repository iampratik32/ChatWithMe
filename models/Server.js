var Sequelize = require('sequelize')
const db = require('../database/db')

const Server = db.define('Server',{
    name:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    image:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    description:{
        type: Sequelize.TEXT,
        allowNull:true,
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
    tableName:'servers'
})

Server.sync({ alter: true })


module.exports = Server