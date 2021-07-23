var Sequelize = require('sequelize')
const db = require('../database/db')
const User = require('./User')

const Profile = db.define('Profile', {
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    image: {
        allowNull: true,
        type: Sequelize.STRING
    },
    userName: {
        allowNull: true,
        type: Sequelize.STRING,
        unique: true
    },
    status:{
        allowNull:false,
        type:Sequelize.STRING,
        defaultValue: 'Online'
    }
}, {
    tableName: 'profiles',
})

// Profile.belongsTo(User)
Profile.prototype.getUser = async function (id){
    console.log('Ok'+id)
}

Profile.sync({ alter: true })


module.exports = Profile
