const express = require('express');
const security = require('../Security/authentication');
const user = require('../middleware/authenticationMiddleware');
const { storage } = require('../utility/cloudinary');
const multer = require('multer');
const upload = multer({ storage });
const router = express.Router();
const catchAsync = require('./controllers/catchAsync');
const admin = require('./controllers/adminController');
const ExpressError = require('../utility/error/ExpressError');
const validate = require('../middleware/validationMiddleware');

//* GET ROUTES------------------------------------------------------------------------


router.get('/', user.isAuth, (req, res) => {
    res.redirect('/courses/admin/homepage');
});


router.get('/login', (req, res) => {
    if (req.session.signed_in) {
        res.redirect('/courses/admin/homepage');
    } else
        res.render('admin/login', { layout: false });
});


router.get('/logout', async (req, res) => {
    console.log(`On delete request ${req.session.user_id}`);
    security.deserializeUser(req);
    res.redirect('/courses/admin/login');
});

router.get('/homepage', user.isAuth, catchAsync(admin.getHomepage));

router.get('/account', user.isAuth, catchAsync(admin.getAccountPage));

router.get('/departments', user.isAuth, catchAsync(admin.getDepartmentsPage));

router.get('/departments/:id', user.isAuth, validate.validateDepartmentRetrieval, catchAsync(admin.getSpecificDept));

router.get('/modules', user.isAuth, validate.validateModules, catchAsync(admin.getModulesPage));

router.get('/modules/:name', user.isAuth, catchAsync(admin.getSpecificModule));

router.get('/notices', user.isAuth, catchAsync(admin.getNotices));




//* POST ROUTES----------------------------------------------------------------------

router.post('/login', validate.validateLogin, catchAsync(admin.adminLogin));

router.post('/notices', user.isAuth, upload.single('fileInput'), catchAsync(admin.uploadNotice));

router.post('/departments', user.isAuth, validate.validateNewDept, catchAsync(admin.addDepartment));

router.post('/modules', user.isAuth, validate.validateNewModule, catchAsync(admin.addModule));






//* PUT ROUTES----------------------------------------------------------------------------

router.put('/departments', user.isAuth, validate.validateUpdateDept, catchAsync(admin.updateDepartment));

router.put('/modules', user.isAuth, validate.validateUpdateModule, catchAsync(admin.updateModule));

router.put('/account', user.isAuth, validate.validateAdminAcc, catchAsync(admin.updateAccount));




//* DELETE ROUTES---------------------------------------------------------------------

router.delete('/departments/:id', user.isAuth, catchAsync(admin.deleteDepartment));

router.delete('/modules/:name', user.isAuth, catchAsync(admin.deleteModule));

router.delete('/notices', user.isAuth, catchAsync(admin.deleteNotice));



router.all('*', user.isAuth, (req, res, next) => {
    next(new ExpressError(404, 'Page not found inside admin routes!'));
});


router.use((err, req, res, next) => {
    const requestedFrom = req.headers['request-type'];
    const { statusCode = 500 } = err;
    const error = err;
    if (statusCode === 404) {
        var layoutVar = { title: 'Not found', script: '' };
        res.status(statusCode).render('error/admin404', { layoutVar, layout: 'admin/layout' });
    } else if (statusCode === 401) {
        res.status(statusCode).render('error/adminerror', { error, layout: false });
    } else {
        if (requestedFrom) {
            console.log(requestedFrom);
            res.status(statusCode).render('error/adminerror', { error, layout: false });
        } else {
            var layoutVar = { title: `Error ${statusCode}`, script: '' };
            res.status(statusCode).render('error/adminerror', { layoutVar, error, layout: 'admin/layout' });
        }
    }
});




module.exports = router;

