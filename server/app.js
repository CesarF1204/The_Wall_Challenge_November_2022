const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const apiRoutes = require('./routes/api.routes.js')

/* constants */
const {PORT, SESSION_SECRET, SESSION_EXPIRE_AT} = require('../config/constants')


const app = express();

app.use(express.json());

/* session */
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {expires: new Date(Date.now() + SESSION_EXPIRE_AT), maxAge: SESSION_EXPIRE_AT}
}));

/* body parser */
app.use(bodyParser.urlencoded({limit: '50mb', extended:true}));
app.use(bodyParser.json({limit: '50mb'}));

/* ejs */
app.set('view engine', 'ejs');

/* views */
app.set('views', path.join(__dirname, '/views'));

/* assets */
app.use(express.static(path.join(__dirname + "/assets")));



/* routes */
apiRoutes(app);

const server = app.listen(PORT, function() {
    console.log(`listening to ${PORT}`)
})