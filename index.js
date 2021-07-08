const express = require('express')
const session = require('express-session')
const flash = require('express-flash')
const PostgresStore = require('connect-pg-simple')(session)
const sessionPool = require('pg').Pool
const cookieParser = require('cookie-parser')
const db = require('./database/config')
const app = express();
const path = require('path')
const routes = require('./routes/web')
// const bodyParser = require('body-parser')
const passport = require('passport')

const sessionKey = '7ewp1gk3mftoru';

app.use(express.static(path.join(__dirname, './public')))
// app.use(bodyParser());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(flash())

const sessionDBaccess = new sessionPool({
    user: db.USER,
    password: db.Password,
    host: db.Host,
    port: db.Port,
    database: db.Database})

const sessionConfig = {
    store: new PostgresStore({
        pool: sessionDBaccess,
        tableName: 'session'
    }),

    name: 'SID',
    secret: sessionKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: true,
        secure: false // ENABLE ONLY ON HTTPS
    }
}

app.use(session(sessionConfig))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', routes())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))



app.listen(3000, () => {
    console.log('http://localhost:3000')
})

