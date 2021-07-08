const express = require('express')
const routes = express.Router()
const passport = require('passport')


//controllers & Middlewares

const WelcomeController = require('../controllers/WelcomeController')
const LoginController = require('../controllers/Auth/LoginController')
const RegisterController = require('../controllers/Auth/RegisterController')
const ProfileController = require('../controllers/ProfileController')
const ImageController = require('../controllers/ImageController')


const { loginValidation } = require('../middlewares/validators/loginValidator')
const { authentication } = require('../middlewares/authMiddleware')
const { nonUser } = require('../middlewares/safeMiddleware')
const { registerValidation } = require('../middlewares/validators/registerValidator')

module.exports = () => {

    routes.get('/login', nonUser, LoginController.index)
    routes.get('/register', nonUser, RegisterController.index)
    routes.get('/logout', (req, res) => {
        req.logOut()
        return res.redirect('/')
    })

    routes.post('/register', registerValidation, RegisterController.store)
    routes.post('/login', loginValidation, LoginController.store)

    routes.get('/', authentication, WelcomeController.index)

    routes.get('/profile', ProfileController.create)
    routes.post('/profile', ProfileController.store)

    routes.get('/uploads/:image',ImageController.index)



    // routes.get('/home')


    return routes
}
