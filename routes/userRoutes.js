const express = require('express');
const db = require('../database/dbHandler');
const router = express.Router();
const pdfContent = require('../utility/pdfCreator');
const puppeteer = require('puppeteer');

var pdfPage = null;

//* GET ROUTES---------------------------------------------------------


router.get('/', (req, res) => {
    res.render('user/partials/homepage', { layout: 'user/layout' });
});

router.get('/register', async (req, res) => {
    if (Object.keys(req.query).length === 0) {
        res.render('user/partials/course_registration', { layout: 'user/layout' });
    }
    else {
        var q = req.query;
        var data = await db.processSelection(q);
        var lvl = q.level;
        res.render('user/boilerplates/selection', { lvl, data, layout: false });
    }
});

router.get('/modules', async (req, res) => {
    if (Object.keys(req.query).length === 0)
        res.render('user/partials/modules', { layout: 'user/layout' });
    else {
        var data = req.query;
        const dept = await db.getDepartmentDetails(data.department);
        const result = await db.getmodulesDetails(data.department, data.level);
        res.render('user/boilerplates/showModules', { dept, result, layout: false });
    }
});


router.get('/downloads', async (req, res) => {
    res.writeHead(200, { 'content-Type': 'application/pdf', 'Content-Disposition': 'attachment; filename="registrationform.pdf"' });
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(`${pdfPage}`);
    const buffer = await page.pdf({ format: "A4" });
    await browser.close();
    res.end(buffer);
});


//* POST ROUTES----------------------------------------------------------------------

router.post('/register', async (req, res) => {
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

