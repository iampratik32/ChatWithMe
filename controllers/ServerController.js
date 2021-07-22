const Server = require('../models/Server')
const multerUpload = require('../middlewares/multerMiddleware')
const multer = require('multer')
const User = require('../models/User')
const UserServer = require('../models/UserServer')
const upload = multerUpload.single('Image')

exports.create = async (req, res) => {
    return res.render('Server/create', {
        user: req.user,
        title: 'Create New Server'
    })
}

exports.update = async (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            console.log('Error  ' + err)
            return res.send(err)
        } else if (err) {
            console.log('Error  ' + err)
            return res.send(err)
        }
        try {
            const sId = req.body.id
            await Server.findOne({ where: { id: sId } }).then(async (server) => {
                fileName = server.image
                if (req.file != null) {
                    const fileName = await req.file.filename
                    server.image = fileName
                }
                server.name = req.body.Name
                server.description = req.body.Description
                server.save().then(() => {
                    return res.redirect(`/server/${server.id}`)
                })
            })
        }
        catch (err) {
            console.log(err)
            res.send(err)
        }
    })
}

exports.store = async (req, res, next) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            console.log('Error  ' + err)
            return res.send(err)
        } else if (err) {
            console.log('Error  ' + err)
            return res.send(err)
        }
        try {
            var fileName = "";
            if (req.file != null) {
                fileName = await req.file.filename
            }
            const server = Server.build({
                user_id: await req.user.id,
                image: fileName,
                name: req.body.Name,
                description: req.body.Description,
            })

            server.save().then((s) => {
                UserServer.build({
                    user_id: s.user_id,
                    server_id: s.id
                }).save()
                return res.redirect(`/server/${server.id}`)
            })
        }
        catch (err) {
            console.log(err)
            res.send(err)
        }
    })
}

exports.show = async (req, res) => {
    const sId = req.params.id
    await Server.findOne({ where: { id: sId } }).then(async (server) => {
        if (server) {
            const user = req.user;
            const us = await UserServer.findOne({where:{user_id:user.id,server_id:server.id}})
            if(!us){
                return res.send(404)
            }
            const channels = await server.getChannels()
            const admin = await User.findByPk(server.user_id, { attributes: ['id', 'name'], include: 'Profile' })
            return res.render('Server/show', {
                user: user,
                admin: admin,
                server: server,
                channels: channels,
                title: server.name
            })
        }
        return res.send(404)

    })
}

exports.edit = async (req, res) => {
    const sId = req.params.id
    await Server.findOne({ where: { id: sId } }).then(async (server) => {
        if (server) {
            if (server.user_id == req.user.id) {
                return res.render('Server/edit', {
                    user: req.user,
                    server: server,
                    title: `Edit ${server.name} Server`
                })
            }
            else {
                return res.send(403)
            }
        }
        return res.send(404)

    })
}

exports.destroy = async (req, res) => {
    const id = req.body.id
    try {
        const server = await Server.findByPk(id)
        await server.destroy().then(() => {
            res.redirect('/')
        })

    }
    catch (err) {
        console.log(err)
        res.send(err)
    }

}

exports.index = async (req, res) => {
    const allServers = await req.user.allServers()
    return res.render('Server/index', {
        user: req.user,
        servers: allServers,
        title: 'Your Servers'
    })
}