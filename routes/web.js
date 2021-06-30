const express = require('express')
const routes = express.Router()
const {registerValidation} = require('../middlewares/validators/registerValidator')
//controllers

const WelcomeController = require('../controllers/WelcomeController')
const LoginController = require('../controllers/Auth/LoginController')
const RegisterController = require('../controllers/Auth/RegisterController')

module.exports = ()=>{

    routes.get('/',WelcomeController.index)

    routes.get('/login',LoginController.index)
    routes.get('/register',RegisterController.index)

    routes.post('/register',registerValidation,RegisterController.store)
    routes.post('/register',registerValidation,LoginController.store)
    

    return routes
}
