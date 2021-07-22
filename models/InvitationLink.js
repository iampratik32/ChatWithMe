var Sequelize = require('sequelize')
const db = require('../database/db')

const InvitationLink = db.define('InvitationLink',{
    server_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'servers',
            key: 'id'
        }
    },
    link:{
        type: Sequelize.STRING,
        unique:true,
        allowNull:false
    }
},{
    tableName:'invitation_links'
})

InvitationLink.sync({ alter: true })



module.exports = InvitationLink