const express = require('express');
const fs = require('fs');
const path = require('path');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const router = require('./routes/index');
const https = require('https');
const session = require('express-session');
const dotenv = require('dotenv');
const flash = require('connect-flash');
const mysql2 = require('mysql2/promise');
const MySQLStore = require('express-mysql-session')(session);
const flashMiddleware = require('./middleware/flashMiddleware');

dotenv.config();

const dbOpt = {
    host: process.env.DATABASE_URL,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME
};

const sessionAdminOpt = {
    clearExpired: true,
    checkExpirationInterval: 900000,
    createDatabaseTable: true
};

const connection = mysql2.createPool(dbOpt);

const sessionStoreAdmin = new MySQLStore(sessionAdminOpt, connection);

const sessionAdmin = {
    secret: process.env.SESSION_SECRET || 'Session Secret',
    store: sessionStoreAdmin,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: 1000 * 60 * 30
    }
};

//! SSL certificate setup for local environment --------------------------------------------

var privateKey = fs.readFileSync(path.join(__dirname, 'certificates/server.key'));
var certificate = fs.readFileSync(path.join(__dirname, 'certificates/server.cert'));
var credentials = { key: privateKey, cert: certificate };

//! HTTPS Server Creation -----------------------------------------------------------------------

const app = express();
const port = 3000;
const server = https.createServer(credentials, app);

app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(flash());


app.use('/courses/admin', session(sessionAdmin), flash(), flashMiddleware, router.admin);
app.use('/courses', router.user);


server.listen(port, () => {
    console.log(`serving on port ${port}`);
});

