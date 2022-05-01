const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const router = require('./routes');


const app = express();
const port = 3000;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(router);



app.listen(port, () => {
    console.log(`serving on port ${port}`);
});

