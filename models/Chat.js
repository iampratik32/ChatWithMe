var Sequelize = require('sequelize')
const db = require('../database/db')

const Chat = db.define('Chat',{
    message:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    seen:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    channel_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'server_channels',
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
    tableName: 'chats'
})

Chat.sync({ alter: true })


module.exports = Chat