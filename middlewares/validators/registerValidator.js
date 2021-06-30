const { check, validationResult } = require('express-validator')
const User = require('../../models/User')

exports.registerValidation = [

    check('email').isEmail().withMessage('Enter Valid Email').bail().custom(async value=>{
        const one = await User.findOne({where:{email:value}})
        if(one!=null){
            return Promise.reject()
        }
    }).withMessage('Email is already in use.').bail(),
    check('name').trim().not().isEmpty().withMessage('Name Cannot Be Empty').bail(),
    check('password').not().isEmpty().withMessage('Password Cannot Be Empty')
        .isLength({ min: 6 }).withMessage(`Password's Length Must Be Greater Than 6`).bail(),
    check('confirm').not().isEmpty().withMessage('Confirmation Password Cannot Be Empty').bail(),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(errors.errors)
            res.redirect('back')
            return
        }
        else if (req.body.confirm != req.body.password) {
            console.log('NOT SAME')
            res.redirect('back')
            return
        }
        next()
    },

    
]