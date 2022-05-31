const express = require('express');
const router = express.Router();
const catchAsync = require('../utility/controllers/catchAsync');
const user = require('../utility/controllers/userController');
const ExpressError = require('../utility/error/ExpressError');

var pdfPage = null;

//* GET ROUTES---------------------------------------------------------


router.get('/', (req, res) => {
    res.render('user/partials/homepage', { layout: 'user/layout' });
});

router.get('/register', catchAsync(user.getRegister));

router.get('/modules', catchAsync(user.getModules));

router.get('/downloads', catchAsync(user.getDownloads));



//* POST ROUTES----------------------------------------------------------------------

router.post('/register', catchAsync(user.postRegister));



router.all('*', (req, res, next) => {
    next(new ExpressError(404, 'Page not found!'));
});

router.use((err, req, res, next) => {
    const requestedFrom = req.headers['request-type'];
    const { statusCode = 500, message = 'Something went Wrong' } = err;
    if (statusCode === 404) {
        res.status(statusCode).render('error/user404', { layout: 'user/layout' });
    } else {
        if (requestedFrom) {
            console.log(requestedFrom);
            res.status(statusCode).render('error/error', { layout: false });
        } else
            res.status(statusCode).render('error/error', { layout: 'user/layout' });
    }
});

module.exports = router;

