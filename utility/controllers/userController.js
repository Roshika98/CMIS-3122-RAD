const db = require('../../database/dbHandler');
const pdfContent = require('../pdfCreator');
const puppeteer = require('puppeteer');


const getRegister = async (req, res) => {
    if (Object.keys(req.query).length === 0) {
        res.render('user/partials/course_registration', { layout: 'user/layout' });
    }
    else {
        var q = req.query;
        var data = await db.processSelection(q);
        var lvl = q.level;
        res.render('user/boilerplates/selection', { lvl, data, layout: false });
    }
};

const getModules = async (req, res) => {
    if (Object.keys(req.query).length === 0)
        res.render('user/partials/modules', { layout: 'user/layout' });
    else {
        var data = req.query;
        const dept = await db.getDepartmentDetails(data.department);
        const result = await db.getmodulesDetails(data.department, data.level);
        res.render('user/boilerplates/showModules', { dept, result, layout: false });
    }
};

const getDownloads = async (req, res) => {
    res.writeHead(200, { 'content-Type': 'application/pdf', 'Content-Disposition': 'attachment; filename="registrationform.pdf"' });
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(`${req.session.pdfPage}`);
    const buffer = await page.pdf({ format: "A4" });
    await browser.close();
    res.end(buffer);
};


const postRegister = async (req, res) => {
    data = req.body;
    var imgUrl = req.session.imgPath ? req.session.imgPath : '/image/';
    var pdfTemplate = await pdfContent(data.personal.level, data, imgUrl);
    req.session.pdfPage = pdfTemplate;
    res.send('okay');
};


const postImage = async (req, res) => {
    req.session.imgPath = req.file.path;
    console.log(req.file);
    res.sendStatus(200);
};

module.exports = { getRegister, getModules, getDownloads, postRegister, postImage };