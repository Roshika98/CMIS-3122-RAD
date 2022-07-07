const db = require('../../database/dbHandler');
const pdfContent = require('../pdfCreator');
const puppeteer = require('puppeteer');
const { cloudinary } = require('../cloudinary');

const homeScript = '/javaScript/studentHome.js';
const moduleScript = '/javaScript/infoHandler.js';
const registerScript = '/javaScript/formHandler.js';



const getHomepage = async (req, res) => {
    const notices = await db.getAllNotices();
    var pageScript = homeScript;
    res.render('user/partials/homepage', { notices, pageScript, layout: 'user/layout' });
};


const getRegister = async (req, res) => {
    if (Object.keys(req.query).length === 0) {
        var pageScript = registerScript;
        res.render('user/partials/course_registration', { pageScript, layout: 'user/layout' });
    }
    else {
        var q = req.query;
        var data = await db.processSelection(q);
        var lvl = q.level;
        res.render('user/boilerplates/selection', { lvl, data, layout: false });
    }
};

const getModules = async (req, res) => {
    if (Object.keys(req.query).length === 0) {
        var pageScript = moduleScript;
        const departmentsSet = await db.getAllDepartments();
        res.render('user/partials/modules', { pageScript, departmentsSet, layout: 'user/layout' });
    }
    else {
        var data = req.query;
        const dept = await db.getDepartmentDetails(data.department);
        const result = await db.getmodulesDetails(data.department, data.level);
        var level = data.level;
        res.render('user/boilerplates/showModules', { dept, result, level, layout: false });
    }
};

const getDownloads = async (req, res) => {
    const filename = req.session.filename;
    res.writeHead(200, { 'content-Type': 'application/pdf', 'Content-Disposition': 'attachment; filename="registrationform.pdf"' });
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(`${req.session.pdfPage}`);
    const buffer = await page.pdf({ format: "A4" });
    await browser.close();
    await cloudinary.uploader.destroy(filename);
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
    req.session.filename = req.file.filename;
    res.sendStatus(200);
};


const showNotice = async (req, res) => {
    const id = req.params.id;
    const result = await db.getNotice(id);
    var pageScript = '';
    res.render('user/partials/notice', { pageScript, result, layout: 'user/layout' });
};

module.exports = { getHomepage, getRegister, getModules, getDownloads, postRegister, postImage, showNotice };