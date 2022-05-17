const express = require('express');
const db = require('../database/dbHandler');
const pdfContent = require('../utility/pdfCreator');
const pdf = require('html-pdf');
const path = require('path');
const router = express.Router();



// !GET ROUTES---------------------------------------------------

router.get('/courses', (req, res) => {
    res.render('layouts/homepage');
});

router.get('/courses/register', async (req, res) => {
    if (Object.keys(req.query).length === 0) {
        res.render('layouts/course_registration');
    }
    else {
        var q = req.query;
        var data = await db.processSelection(q);
        var lvl = q.level;
        res.render('boilerplates/selection', { lvl, data });
    }
});

router.get('/courses/modules', async (req, res) => {
    if (Object.keys(req.query).length === 0)
        res.render('layouts/modules');
    else {
        var data = req.query;
        const dept = await db.getDepartmentDetails(data.department);
        const result = await db.getmodulesDetails(data.department, data.level);
        res.render('boilerplates/showModules', { dept, result });
    }
});


// !POST ROUTES--------------------------------------------

router.post('/courses/register', async (req, res) => {
    console.log('post request made');
    console.log(req.body);
    data = req.body;
    data.semester1.mandatory.forEach(element => {
        console.log(element);
    });
    res.render('forms/normal', { data });
});



module.exports = router;