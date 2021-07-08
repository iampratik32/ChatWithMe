const Profile = require('../models/Profile')
const User = require('../models/User')
const multerUpload = require('../middlewares/multerMiddleware')
const multer= require('multer')
const upload = multerUpload.single('Image')

exports.create = async (req, res) => {
    if (req.isAuthenticated()) {
        const user = await User.findByPk(req.user.id, { attributes: ['id', 'name', 'role', 'email'], include: 'Profile' })
        return res.render('Profile/create', {
            user: user,
            title: 'Create Profile'
        })
    }
    return res.redirect('/login')
}
exports.store = (req, res, next) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            console.log('Error  '+err)
            return res.send(err)
        } else if (err) {
            console.log('Error  '+err)
            return res.send(err)
        }
        
        try {
            const profile = await req.user.getProfile()
            fileName = profile.image
            if(req.file!=null){
                const fileName = await req.file.filename
                profile.image = fileName
            }
            profile.userName = req.body.username
            profile.save().then((e)=>{
                return res.redirect('/')
            })
        }
        catch (err) {
            return res.send('Error')
        }
    })

}