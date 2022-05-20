const express = require('express');
const db = require('../database/dbHandler');
const router = express.Router();



// !GET ROUTES---------------------------------------------------


//* VISITOR ROUTES-----------------------------------------------


router.get('/courses', (req, res) => {
    res.render('layouts/homepage', { layout: false });
});

router.get('/courses/register', async (req, res) => {
    if (Object.keys(req.query).length === 0) {
        res.render('layouts/course_registration', { layout: false });
    }
    else {
        var q = req.query;
        var data = await db.processSelection(q);
        var lvl = q.level;
        res.render('boilerplates/selection', { lvl, data, layout: false });
    }
});

router.get('/courses/modules', async (req, res) => {
    if (Object.keys(req.query).length === 0)
        res.render('layouts/modules', { layout: false });
    else {
        var data = req.query;
        const dept = await db.getDepartmentDetails(data.department);
        const result = await db.getmodulesDetails(data.department, data.level);
        res.render('boilerplates/showModules', { dept, result, layout: false });
    }
});


//* ADMIN ROUTES---------------------------------------------------

router.get('/courses/admin/homepage', (req, res) => {
    var layoutVar = { title: 'home', script: '' };
    res.render('admin/partials/home', { layoutVar, layout: 'admin/layout' });
});

router.get('/courses/admin/account', (req, res) => {
    var layoutVar = { title: 'account', script: '/javaScript/controllers/user.js' };
    res.render('admin/partials/user', { layoutVar, layout: 'admin/layout' });
});

router.get('/courses/admin/departments', async (req, res) => {
    var layoutVar = { title: 'departments', script: '/javaScript/controllers/departments.js' };
    var result = await db.getAllDepartments();
    console.log(result);
    res.render('admin/partials/departments', { layoutVar, result, layout: 'admin/layout' });
});

router.get('/courses/admin/departments/:id', async (req, res) => {
    var { id } = req.params;
    var result = await db.getDepartmentDetails(id);
});


router.get('/courses/admin/modules', async (req, res) => {
    if (Object.keys(req.query).length == 0) {
        var layoutVar = { title: 'modules', script: '/javaScript/controllers/modules.js' };
        res.render('admin/partials/modules', { layoutVar, layout: 'admin/layout' });
    } else {
        console.log('hit');
        var data = req.query;
        const dept = await db.getDepartmentDetails(data.department);
        const result = await db.getmodulesDetails(data.department, data.level);
        var level = data.level;
        console.log(dept);
        res.render('admin/cardContent/modulesCard', { dept, level, result, layout: false });
    }
});




// !POST ROUTES--------------------------------------------

router.post('/courses/register', async (req, res) => {
    console.log('post request made');
    console.log(req.body);
})


//* ADMIN ROUTES--------------------------------------

router.put('/courses/admin/departments/:id', (req, res) => {

});

router.post('/courses/admin/departments', async (req, res) => {
    const data = req.body;
    const result = await db.createNewDepartment(data);
    res.send(result);
});

router.delete('/courses/admin/departments/:id', async (req, res) => {
    const id = req.params.id;
    const result = await db.deleteDepartment(id);
    res.send(result);
});



module.exports = router;