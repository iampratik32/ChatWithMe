var Sequelize = require('sequelize')
const db = require('../database/db')
const Profile = require('./Profile')

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

// User.prototype.getProfile = async function (){
//     return Profile.findOne({where:{user_id:this.id}})
// }

User.hasOne(Profile,{
    foreignKey: 'user_id'
})
Profile.belongsTo(User,{
    foreignKey:'user_id'
})

module.exports = User
