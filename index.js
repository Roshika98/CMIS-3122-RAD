const express = require('express');
const path = require('path');
const methodOverride = require('method-override');


const app = express();
const port = 3000;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));



// GET REQUESTS-------------------------------------------------

app.get('/', (req, res) => {
    res.render('homepage');
});



// POST REQUESTS-------------------------------------------------



// PUT REQUESTS--------------------------------------------------



app.listen(port, () => {
    console.log(`serving on port ${port}`);
});

