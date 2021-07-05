const db = require('../../database/db')
const User = require('../../models/User')
const auth = require('../../auth')
const passport = require('passport')

auth(passport)


exports.index = (req, res) => {
    res.render('Auth/login', {
        title: 'Login User'
    })

}
exports.store = async (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return res.redirect('/');
        });
    })(req, res, next);

}




// bcrypt.compare(someOtherPlaintextPassword, hash).then(function(result) {
//     // result == false
// });