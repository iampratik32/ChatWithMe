const express = require('express')
const session = require('express-session')
const app = express();
const path = require('path')
const routes = require('./routes/web')


app.use(express.static(path.join(__dirname, './public')))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'./views'))


app.use('/',routes())

app.listen(3001,()=>{
    console.log('http://localhost:3001')
}) 

