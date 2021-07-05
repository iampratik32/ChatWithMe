const { check, validationResult } = require('express-validator')

exports.loginValidation = [
    check('email').isEmail().withMessage('Enter Valid Email').bail(),
    check('password').not().isEmpty().withMessage('Password Cannot Be Empty')
        .isLength({ min: 6 }).withMessage(`Password's Length Must Be Greater Than 6`).bail(),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(errors.errors)
            // res.locals.error_messages = req.flash('asdsad');
            res.redirect('back')
            return
        }
       
        next()
    },
]