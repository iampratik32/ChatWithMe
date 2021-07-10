var Sequelize = require('sequelize')
const db = require('../database/db')
const ServerChannel = require('./ServerChannel')

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

Server.hasMany(ServerChannel,{
    foreignKey: 'server_id',
    onDelete:'cascade'
})

ServerChannel.belongsTo(Server,{
    foreignKey:'server_id'
})

Server.prototype.getChannels = async function (){
    return ServerChannel.findAll({where:{server_id:this.id}})
}

module.exports = Server