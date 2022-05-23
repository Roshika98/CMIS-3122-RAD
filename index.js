const express = require('express');
const fs = require('fs');
const path = require('path');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const router = require('./routes');
const https = require('https');




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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(router);


server.listen(port, () => {
    console.log(`serving on port ${port}`);
});

