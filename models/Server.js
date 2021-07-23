var Sequelize = require('sequelize')
const db = require('../database/db')
const InvitationLink = require('./InvitationLink')
const ServerChannel = require('./ServerChannel')
const User = require('./User')
const UserServer = require('./UserServer')

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

Server.hasMany(InvitationLink,{
    foreignKey: 'server_id',
    onDelete:'cascade'
})

ServerChannel.belongsTo(Server,{
    foreignKey:'server_id'
})

Server.hasMany(UserServer,{
    foreignKey:'server_id',
    onDelete:'cascade'
})

UserServer.belongsTo(Server,{
    foreignKey:'server_id'
})

InvitationLink.belongsTo(Server,{
    foreignKey: 'server_id'
})

Server.prototype.getChannels = async function (){
    return ServerChannel.findAll({where:{server_id:this.id}})
}
Server.prototype.getUsers = async function (){

    return UserServer.findAll({where:{server_id:this.id},include:'User', attributes:['User.*']})
}

module.exports = Server