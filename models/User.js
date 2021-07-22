var Sequelize = require('sequelize')
const db = require('../database/db')
const Profile = require('./Profile')
const Server = require('./Server')
const UserServer = require('./UserServer')

const User = db.define('User', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        unique:true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        defaultValue: 'User'
    }
}, {
    tableName: 'users',
})

User.sync({ alter: true })

User.prototype.createProfile = async function (){
    const newProfile = Profile.build({
        user_id: this.id
    })
    await newProfile.save()
}

User.prototype.getProfile = async function (){
    return Profile.findOne({where:{user_id:this.id}})
}
User.prototype.getServers = async function (){
    return Server.findAll({where:{user_id:this.id}})
}
User.prototype.allServers = async function (){
    return UserServer.findAll({where:{user_id:this.id},include:'Server'})
}

User.hasOne(Profile,{
    foreignKey: 'user_id'
})
User.hasMany(Server,{
    foreignKey: 'user_id'
})
User.hasMany(UserServer,{
    foreignKey: 'user_id'
})
Profile.belongsTo(User,{
    foreignKey:'user_id'
})
Server.belongsTo(User,{
    foreignKey:'user_id'
})

UserServer.belongsTo(User,{
    foreignKey:'user_id'
})


module.exports = User
