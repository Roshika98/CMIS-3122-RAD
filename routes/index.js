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

    var { items } = data;
    console.log(items);

    res.render('layouts/modules', { data });
});

// db.startConnection();
// db.getmodules();


module.exports = router;