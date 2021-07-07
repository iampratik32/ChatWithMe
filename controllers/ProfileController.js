const Profile = require('../models/Profile')
const User = require('../models/User')

exports.create = async (req,res) =>{
    if(req.isAuthenticated()){
        const user = await User.findByPk(req.user.id,{attributes:['id','name','role','email'],include:'Profile'})
        return res.render('Profile/create',{
            user: user,
            title:'Create Profile'
        })
    }
    return res.redirect('/login')
}
exports.store = async (req,res,next) =>{
    console.log(req.body);
    return res.send('Good')
}