const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('./models/User')

function initialize(passport) {


    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        const user = await User.findOne({where:{email:email}})
        if (user == null) {
            return done(null, false, { message: 'No User With That Email' })
        }
        try {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result == true) {
                    return done(null, user)
                }
                return done(null, false, { message: 'Password Did Not Match' })

            })

        }
        catch (err) {
            return done(err)
        }
    }))

    passport.serializeUser((user, done) => done(null, user.id))

    passport.deserializeUser(async (_id, done) => {
        return done(null, await User.findByPk(_id,{attributes:['id','name','role']}))
    })
}

module.exports = initialize