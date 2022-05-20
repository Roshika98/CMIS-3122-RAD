const express = require('express');
const db = require('../database/dbHandler');
const pdfContent = require('../utility/pdfCreator');
const path = require('path');
const puppeteer = require('puppeteer');
const router = express.Router();

var pdfPage = null;

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


router.get('/courses/downloads', async (req, res) => {
    res.writeHead(200, { 'content-Type': 'application/pdf', 'Content-Disposition': 'attachment; filename="registrationform.pdf"' });
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(`${pdfPage}`);
    const buffer = await page.pdf({ format: "A4" });
    await browser.close();
    res.end(buffer);
});


// !POST ROUTES--------------------------------------------

router.post('/courses/register', async (req, res) => {
    console.log('post request made');
    console.log(req.body);
    data = req.body;
    data.semester1.mandatory.forEach(element => {
        console.log(element);
    });
    var pdfTemplate = await pdfContent(data.personal.level, data);
    pdfPage = pdfTemplate;
    res.send('okay');
});



module.exports = router;