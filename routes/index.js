const express = require('express');
const db = require('../database/dbHandler');
const router = express.Router();



// GET ROUTES---------------------------------------------------
router.get('/courses', (req, res) => {
    res.render('layouts/homepage');
});

router.get('/courses/register', (req, res) => {
    res.render('layouts/course_registration');
});

router.get('/courses/modules', async (req, res) => {
    var data = await db.getmodules();
    console.log(data);
    console.log(data[0].course_code);
    res.render('layouts/modules');
});

// db.startConnection();
// db.getmodules();


module.exports = router;