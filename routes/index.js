const express = require('express');
const db = require('./database/dbHandler');
const router = express.Router();



// GET ROUTES---------------------------------------------------
router.get('/', (req, res) => {
    res.render('layouts/homepage');
});

router.get('/register', (req, res) => {
    res.render('layouts/course_registration');
});



module.exports = router;