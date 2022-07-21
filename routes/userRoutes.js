const express = require('express');
const router = express.Router();
const catchAsync = require('./controllers/catchAsync');
const user = require('./controllers/userController');
const ExpressError = require('../utility/error/ExpressError');
const validate = require('../middleware/validationMiddleware');
const { storage } = require('../utility/cloudinary');
const multer = require('multer');
const upload = multer({ storage });


//* GET ROUTES---------------------------------------------------------


router.get('/', catchAsync(user.getHomepage));

router.get('/register', validate.validateDegree, catchAsync(user.getRegister));

router.get('/modules', validate.validateModules, catchAsync(user.getModules));

router.get('/downloads', catchAsync(user.getDownloads));

router.get('/notices/:id', catchAsync(user.showNotice));



//* POST ROUTES----------------------------------------------------------------------

router.post('/register', validate.validatePdf, catchAsync(user.postRegister));

router.post('/register/img', upload.single('img'), catchAsync(user.postImage));



router.all('*', (req, res, next) => {
    next(new ExpressError(404, 'Page not found!'));
});

router.use((err, req, res, next) => {
    const requestedFrom = req.headers['request-type'];
    const { statusCode = 500 } = err;
    const error = defineError(err);
    console.log(err);
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

