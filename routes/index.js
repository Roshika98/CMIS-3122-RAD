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

router.get('/courses/modules', (req, res) => {
    res.render('layouts/modules');
});




module.exports = router;