const express = require('express');
const db = require('../database/dbHandler');
const security = require('../authentication/security');
const user = require('../middleware/authenticationMiddleware');
const router = express.Router();


//! GET ROUTES------------------------------------------------------------------------

//* DEFAULT ROUTE OF THE ADMIN SECTION----

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


//* HOMEPAGE ROUTE OF THE ADMIN SECTION----

router.get('/homepage', user.isAuth, (req, res) => {
    var layoutVar = { title: 'home', script: '/javaScript/controllers/home.js' };
    res.render('admin/partials/home', { layoutVar, layout: 'admin/layout' });
});

//* USER ACCOUNT ROUTE OF THE ADMIN SECTION----

router.get('/account', user.isAuth, async (req, res) => {
    var layoutVar = { title: 'account', script: '/javaScript/controllers/user.js' };
    var data = await db.getAdminProfileDetails(req.session.user_id);
    res.render('admin/partials/user', { layoutVar, data, layout: 'admin/layout' });
});

//* DEPARTMENTS ROUTE OF THE ADMIN SECTION----

router.get('/departments', user.isAuth, async (req, res) => {
    var layoutVar = { title: 'departments', script: '/javaScript/controllers/departments.js' };
    var result = await db.getAllDepartments();
    res.render('admin/partials/departments', { layoutVar, result, layout: 'admin/layout' });
});

//* ROUTE FOR ACCESSING SPECIFIC DEPARTMENT DETAILS FOR EDITING----

router.get('/departments/:id', user.isAuth, async (req, res) => {
    var { id } = req.params;
    var result = await db.getDepartmentDetails(id);
    res.render('admin/cardContent/editDepartment', { id, result, layout: false });
});

//* MODULES ROUTE OF THE ADMIN SECTION----

router.get('/modules', user.isAuth, async (req, res) => {
    if (Object.keys(req.query).length == 0) {
        var layoutVar = { title: 'modules', script: '/javaScript/controllers/modules.js' };
        const departmentsSet = await db.getAllDepartments();
        res.render('admin/partials/modules', { departmentsSet, layoutVar, layout: 'admin/layout' });
    } else {
        console.log('hit');
        var data = req.query;
        const dept = await db.getDepartmentDetails(data.department);
        const result = await db.getmodulesDetails(data.department, data.level);
        var level = data.level;
        res.render('admin/cardContent/modulesCard', { dept, level, result, layout: false });
    }
});

//* ROUTE FOR ACCESSING SPECIFIC MODULE DETAILS FOR EDITING----

router.get('/modules/:name', user.isAuth, async (req, res) => {
    var name = req.params.name;
    const moduleData = await db.getModuleDetail(name);
    const departmentsSet = await db.getAllDepartments();
    res.render('admin/cardContent/editModules', { departmentsSet, moduleData, layout: false });
});





//! POST ROUTES----------------------------------------------------------------------

router.post('/login', async (req, res) => {
    const { username, pswrd } = req.body;
    const result = await security.login(username, pswrd);
    if (result.isValid) {
        req.flash('success', 'logged in successfully');
        security.serializeUser(req, result.id);
        console.log(req.session.redirectURL)
        const redirectURL = req.session.redirectURL || '/courses/admin/homepage';
        console.log(`Redirecting to ${redirectURL}`);
        res.redirect(redirectURL);
    } else {
        req.flash('error', 'Username or password is incorrect. please try again..');
        res.redirect('/courses/admin/login');
    }
});


//* ROUTE FOR CREATING A NEW DEPARTMENT----

router.post('/departments', user.isAuth, async (req, res) => {
    const data = req.body;
    const result = await db.createNewDepartment(data);
    req.flash('success', 'Department successfully added');
    res.send(result);
});

//* ROUTE FOR CREATING A NEW MODULE----

router.post('/modules', user.isAuth, async (req, res) => {
    const data = req.body;
    const result = await db.createNewModule(data);
    res.send(result);
});


//* PUT ROUTES----------------------------------------------------------------------------

router.put('/departments', user.isAuth, async (req, res) => {
    var data = req.body;
    const result = await db.updateDepartments(data);
    res.send(result);
});


router.put('/modules', user.isAuth, async (req, res) => {
    const data = req.body;
    console.log(data);
    const result = await db.updateModules(data);
    res.send(result);
});


//* DELETE ROUTES---------------------------------------------------------------------



router.delete('/departments/:id', user.isAuth, async (req, res) => {
    const id = req.params.id;
    const result = await db.deleteDepartment(id);
    res.send(result);
});

router.delete('/modules/:name', user.isAuth, async (req, res) => {
    const name = req.params.name;
    const result = await db.deleteModule(name);
    res.send(result);
});

module.exports = router;

