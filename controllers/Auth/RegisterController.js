const User = require('../../models/User')
const Profile = require('../../models/Profile')
const db = require('../../database/db')
const bcrypt = require('bcrypt')
const saltRounds = 10

exports.index = (req, res) => {

    res.render('Auth/register', {
        title: 'Register User',
    })
}

exports.store = async (req, res) => {

    const body = req.body
    try {
        const newUser = User.build(body)
        await bcrypt.hash(body.password, saltRounds).then(function (hash) {
            // Store hash in your password DB.
            newUser.password = hash
        });

        await newUser.save()
        await newUser.createProfile()

        return res.redirect('/login')
    }

    catch (err) {
        res.send(err.errors[0].message)
    }

}