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
    if (Object.keys(req.query).length === 0)
        res.render('layouts/modules');
    else {
        var data = req.query;
        res.render('layouts/test', { data });
    }
});

// db.startConnection();
// db.getmodules();


module.exports = router;