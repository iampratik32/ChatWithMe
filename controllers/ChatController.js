const Chat = require("../models/Chat");
const User = require("../models/User");

exports.store = async (data)=>{
    const msg = data.message
    const cId = data.cId
    const uId = data.uId

    Chat.build({
        message: msg,
        channel_id: cId,
        user_id: uId
    }).save()
}

exports.fetch = async (req,res)=>{
    const uId = req.body.id
    await User.findByPk(uId, { attributes: ['id', 'name'], include: 'Profile' }).then((user)=>{
        res.json({ user: user })
    })
}