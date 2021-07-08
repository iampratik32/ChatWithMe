const User = require("../models/User")

exports.index = async (req,res) =>{
    const user = await User.findByPk(req.user.id,{attributes:['id','name','role','email'],include:'Profile'})

    res.render('index',{
        user: user,
        title:'Home'
    })
}