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
    var layoutVar = { title: 'home', script: '/javaScript/controllers/user.js' };
    res.render('admin/partials/user', { layoutVar, layout: 'admin/layout' });
});

router.get('/courses/admin/departments', (req, res) => {
    var layoutVar = { title: 'home', script: '/javaScript/controllers/departments.js' };
    var result = await db.getAllDepartments();
    res.render('admin/partials/departments', { layoutVar, layout: 'admin/layout' });
});

router.get('courses/admin/departments/:id', (req, res) => {
    var { id } = req.params;

});


router.get('/courses/admin/modules', (req, res) => {
    var layoutVar = { title: 'home', script: '/javaScript/controllers/modules.js' };
    res.render('admin/partials/modules', { layoutVar, layout: 'admin/layout' });
});








// !POST ROUTES--------------------------------------------

router.post('/courses/register', async (req, res) => {
    console.log('post request made');
    console.log(req.body);
})



module.exports = router;