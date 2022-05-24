const express = require('express');
const db = require('../database/dbHandler');
const router = express.Router();


//* GET ROUTES------------------------------------------------------------------------


router.get('/', (req, res) => {
    req.flash('success', 'Logged in successfully');
    res.redirect('/courses/admin/homepage');
});



router.get('/homepage', (req, res) => {
    var layoutVar = { title: 'home', script: '/javaScript/controllers/home.js' };
    res.render('admin/partials/home', { layoutVar, layout: 'admin/layout' });
});

router.get('/account', (req, res) => {
    var layoutVar = { title: 'account', script: '/javaScript/controllers/user.js' };
    res.render('admin/partials/user', { layoutVar, layout: 'admin/layout' });
});

router.get('/departments', async (req, res) => {
    var layoutVar = { title: 'departments', script: '/javaScript/controllers/departments.js' };
    var result = await db.getAllDepartments();
    res.render('admin/partials/departments', { layoutVar, result, layout: 'admin/layout' });
});

router.get('/departments/:id', async (req, res) => {
    var { id } = req.params;
    var result = await db.getDepartmentDetails(id);
    res.render('admin/cardContent/editDepartment', { id, result, layout: false });
});


router.get('/modules', async (req, res) => {
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

router.get('/modules/:name', async (req, res) => {
    var name = req.params.name;
    const moduleData = await db.getModuleDetail(name);
    const departmentsSet = await db.getAllDepartments();
    res.render('admin/cardContent/editModules', { departmentsSet, moduleData, layout: false });
});


//* POST ROUTES----------------------------------------------------------------------

router.post('/departments', async (req, res) => {
    const data = req.body;
    const result = await db.createNewDepartment(data);
    req.flash('success', 'Department successfully added');
    res.send(result);
});

router.post('/modules', async (req, res) => {
    const data = req.body;
    const result = await db.createNewModule(data);
    res.send(result);
});


//* PUT ROUTES----------------------------------------------------------------------------

router.put('/departments', async (req, res) => {
    var data = req.body;
    const result = await db.updateDepartments(data);
    res.send(result);
});


router.put('/modules', async (req, res) => {
    const data = req.body;
    console.log(data);
    const result = await db.updateModules(data);
    res.send(result);
});


//* DELETE ROUTES---------------------------------------------------------------------

router.delete('/departments/:id', async (req, res) => {
    const id = req.params.id;
    const result = await db.deleteDepartment(id);
    res.send(result);
});

router.delete('/modules/:name', async (req, res) => {
    const name = req.params.name;
    const result = await db.deleteModule(name);
    res.send(result);
});

module.exports = router;

