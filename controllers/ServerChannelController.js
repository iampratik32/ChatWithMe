const Server = require("../models/Server")
const ServerChannel = require("../models/ServerChannel")
const User = require("../models/User")

exports.create = async (req, res) => {
    const sId = req.params.id

    await Server.findByPk(sId, { attributes: ['id', 'name'] }).then((s) => {
        res.render('Channel/create', {
            title: 'Create New Channel',
            user: req.user,
            server: s
        })
    })
}
exports.show = async (req, res) => {
    const sId = req.params.sId
    const cId = req.params.id

    await Server.findOne({ where: { id: sId } }).then(async (server) => {
        if (server) {
            const channels = await server.getChannels()
            const channel = await ServerChannel.findByPk(cId)
            const users = await server.getUsers()            
            const members = users.map(async u => {
                const tUser = await u.User.getThisProfile()
                return tUser
            })

            const allMembers = await Promise.all(members)

            if (channel) {
                const admin = await User.findByPk(server.user_id, { attributes: ['id', 'name'], include: 'Profile' })

                return res.render('Channel/show', {
                    user: req.user,
                    members: allMembers,
                    admin: admin,
                    server: server,
                    channels: channels,
                    channel: channel,
                    title: `${server.name} - ${channel.name}`
                })
            }
            else {
                return res.send(404)
            }

        }
        return res.send(404)

    })
}

exports.edit = async (req, res) => {
    const sId = req.params.sId
    const cId = req.params.id
    const sc = await ServerChannel.findByPk(cId)

    await Server.findByPk(sId, { attributes: ['id', 'name'] }).then((s) => {
        res.render('Channel/edit', {
            title: `Edit ${sc.name}`,
            user: req.user,
            server: s,
            channel: sc
        })
    })

}

exports.store = async (req, res) => {
    try {
        const serverChannel = ServerChannel.build({
            name: req.body.Name,
            server_id: req.body.id
        })
        serverChannel.save().then(() => {
            return res.redirect(`/server/${req.body.id}`)
        })
    }
    catch (err) {
        console.log(err);
        res.send(err)
    }
}
exports.update = async (req, res) => {
    try {
        const serverChannel = await ServerChannel.findByPk(req.body.id)
        serverChannel.name = req.body.Name
        serverChannel.save().then(() => {
            return res.redirect(`/server/${serverChannel.server_id}/channel/${req.body.id}`)
        })
    }
    catch (err) {
        console.log(err);
        res.send(err)
    }
}

exports.destroy = async (req, res) => {
    try {
        const channel = await ServerChannel.findByPk(req.body.id)
        const sId = channel.server_id
        await channel.destroy().then((c) => {
            res.redirect(`/server/${sId}`)
        })
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }
}