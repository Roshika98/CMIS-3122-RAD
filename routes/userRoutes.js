const express = require('express');
const router = express.Router();
const catchAsync = require('../utility/controllers/catchAsync');
const user = require('../utility/controllers/userController');
const ExpressError = require('../utility/error/ExpressError');
const validate = require('../middleware/validationMiddleware');

var pdfPage = null;

//* GET ROUTES---------------------------------------------------------


router.get('/', (req, res) => {
    res.render('user/partials/homepage', { layout: 'user/layout' });
});

router.get('/register', validate.validateDegree, catchAsync(user.getRegister));

router.get('/modules', validate.validateModules, catchAsync(user.getModules));

router.get('/downloads', catchAsync(user.getDownloads));



//* POST ROUTES----------------------------------------------------------------------

router.post('/register', validate.validatePdf, catchAsync(user.postRegister));



router.all('*', (req, res, next) => {
    next(new ExpressError(404, 'Page not found!'));
});

router.use((err, req, res, next) => {
    const requestedFrom = req.headers['request-type'];
    const { statusCode = 500 } = err;
    const error = defineError(err);
    if (statusCode === 404) {
        res.status(statusCode).render('error/user404', { layout: 'user/layout' });
    } else {
        const error = err;
        if (requestedFrom) {
            res.status(statusCode).render('error/error', { error, layout: false });
        } else
            res.status(statusCode).render('error/error', { error, layout: 'user/layout' });
    }
});

function defineError(error) {

}

module.exports = router;

