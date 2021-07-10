const Server = require('../models/Server')
const multerUpload = require('../middlewares/multerMiddleware')
const multer = require('multer')
const User = require('../models/User')
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
            const admin = await User.findByPk(server.user_id, { attributes: ['id', 'name'], include: 'Profile' })
            return res.render('Server/show', {
                user: req.user,
                admin: admin,
                server: server,
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