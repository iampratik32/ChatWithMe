const randomstring = require("randomstring")
const InvitationLink = require("../models/InvitationLink")
const UserServer = require("../models/UserServer")

exports.store = async (req, res) => {
    const sId = req.body.id
    const uId = randomstring.generate({ length: 12 })
    const invitationLink = 'http://' + req.headers.host + '/join/' + uId

    await InvitationLink.build({
        server_id: sId,
        link: uId
    }).save().then((il) => {
        res.json({ link: invitationLink })
    })
}

exports.update = async (req, res) => {
    const uId = req.params.link
    console.log(uId)
    await InvitationLink.findOne({ where: { link: uId } }).then(async (il) => {
        if (il) {
            const userId = await req.user.id
            const sId = il.server_id
            const us = await UserServer.findOne({ where: { user_id: userId, server_id: sId } })
            if (us) {
                return res.render('Invitation/show', {
                    user: req.user,
                    reason: 'Already Present In The Server',
                    sId: sId,
                    title: 'Already Here'
                })
            }
            await UserServer.build({
                user_id: userId,
                server_id: sId
            }).save()

            il.destroy()

            return res.redirect(`/server/${sId}`)
        }
        return res.render('Invitation/show', {
            user: req.user,
            reason: 'Invalid Link. This Is Not A Valid Link',
            sId: null,
            title: 'Invalid Link'
        })
    })


}