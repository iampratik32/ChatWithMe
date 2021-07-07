const Profile = require('../models/Profile')

exports.authentication = async (req,res,next)=>{
    if(req.isAuthenticated()){
        const profile = await Profile.findOne({where:{user_id:req.user.id}})
        if(await profile.username){
            return next()
        }
        return res.redirect('/profile')
    }
    return res.redirect('/login')
}