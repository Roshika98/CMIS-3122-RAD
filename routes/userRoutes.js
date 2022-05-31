const express = require('express');
const db = require('../database/dbHandler');
const router = express.Router();
const pdfContent = require('../utility/pdfCreator');
const puppeteer = require('puppeteer');
const catchAsync = require('../utility/controllers/catchAsync');
const user = require('../utility/controllers/userController');

var pdfPage = null;

//* GET ROUTES---------------------------------------------------------


router.get('/', (req, res) => {
    res.render('user/partials/homepage', { layout: 'user/layout' });
});

router.get('/register', catchAsync(user.getRegister));

router.get('/modules', catchAsync(user.getModules));

router.get('/downloads', catchAsync(user.getDownloads));

router.get('/error', catchAsync(user.getError));


//* POST ROUTES----------------------------------------------------------------------

router.post('/register', catchAsync(user.postRegister));

module.exports = router;

