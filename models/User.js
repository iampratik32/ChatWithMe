var Sequelize = require('sequelize')
const db = require('../database/db')

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

User.prototype.getThisRole = function (){
    return this.role
}

module.exports = User
