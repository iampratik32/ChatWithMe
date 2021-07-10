const User = require("../models/User")

exports.index = async (req, res) => {
    const user = await User.findByPk(req.user.id, { attributes: ['id', 'name', 'role', 'email'], include: 'Profile' })
    const servers = await req.user.getServers()
    res.render('index', {
        user: user,
        servers: servers,
        title: 'Home'
    })
}