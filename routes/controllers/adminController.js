const db = require('../../database/dbHandler');
const { v4: uuidv4 } = require('uuid');
const { cloudinary } = require('../../utility/cloudinary');
const security = require('../../Security/authentication');


const adminHome = '/javaScript/controllers/home.js';
const adminDept = '/javaScript/controllers/departments.js';
const adminModule = '/javaScript/controllers/modules.js';
const adminAcc = '/javaScript/controllers/user.js';
const adminNotice = '/javaScript/controllers/notice.js';



const getHomepage = async (req, res) => {
    var layoutVar = { title: 'home', script: adminHome };
    const data = await db.getAdminName(req.session.user_id);
    res.render('admin/partials/home', { layoutVar, data, layout: 'admin/layout' });
};

const getAccountPage = async (req, res) => {
    var layoutVar = { title: 'account', script: adminAcc };
    var data = await db.getAdminProfileDetails(req.session.user_id);
    res.render('admin/partials/user', { layoutVar, data, layout: 'admin/layout' });
};

const getDepartmentsPage = async (req, res) => {
    var layoutVar = { title: 'departments', script: adminDept };
    var result = await db.getAllDepartments();
    res.render('admin/partials/departments', { layoutVar, result, layout: 'admin/layout' });
};

const getSpecificDept = async (req, res) => {
    var { id } = req.params;
    var result = await db.getDepartmentDetails(id);
    res.render('admin/cardContent/editDepartment', { id, result, layout: false });
};

const getModulesPage = async (req, res) => {
    if (Object.keys(req.query).length == 0) {
        var layoutVar = { title: 'modules', script: adminModule };
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
};

const getSpecificModule = async (req, res) => {
    var name = req.params.name;
    const moduleData = await db.getModuleDetail(name);
    const departmentsSet = await db.getAllDepartments();
    res.render('admin/cardContent/editModules', { departmentsSet, moduleData, layout: false });
};

const getNotices = async (req, res) => {
    var layoutVar = { title: 'notices', script: adminNotice };
    const result = await db.getAllNotices();
    res.render('admin/partials/notices', { layoutVar, result, layout: 'admin/layout' });
};

const adminLogin = async (req, res) => {
    const { username, pswrd } = req.body;
    const result = await security.login(username, pswrd);
    if (result.isValid) {
        req.flash('success', 'logged in successfully');
        security.serializeUser(req, result.id);
        const redirectURL = req.session.redirectURL || '/courses/admin/homepage';
        res.redirect(redirectURL);
    } else {
        req.flash('error', 'Username or password is incorrect. please try again..');
        res.redirect('/courses/admin/login');
    }
};


const uploadNotice = async (req, res) => {
    const data = { id: uuidv4(), heading: req.body.heading, url: req.file.path, filename: req.file.filename };
    const result = await db.addNewNotice(data);
    req.flash('success', 'Notice successfully uploaded!');
    res.redirect('/courses/admin/notices');
};

const addDepartment = async (req, res) => {
    const data = req.body;
    const result = await db.createNewDepartment(data);
    req.flash('success', 'Department successfully added');  //done
    res.send(result);
};

const addModule = async (req, res) => {
    const data = req.body;
    const result = await db.createNewModule(data);  //done
    res.send(result);
};

const updateDepartment = async (req, res) => {
    var data = req.body;
    const result = await db.updateDepartments(data);
    res.send(result);
};

const updateModule = async (req, res) => {
    const data = req.body;
    console.log(data);
    const result = await db.updateModules(data);
    res.send(result);
};

const updateAccount = async (req, res) => {
    const data = req.body;
    const result = await db.updateAdminData(req.session.user_id, data);
    req.flash('success', 'Profile details updated successfully!');
    res.redirect('/courses/admin/account');
};

const deleteDepartment = async (req, res) => {
    const id = req.params.id;
    const result = await db.deleteDepartment(id);
    res.send(result);
};

const deleteModule = async (req, res) => {
    const name = req.params.name;
    const result = await db.deleteModule(name);
    res.send(result);
};

const deleteNotice = async (req, res) => {
    const filename = req.query.filename;
    await cloudinary.uploader.destroy(filename);
    const result = await db.deleteNotice(filename);
    req.flash('success', 'Notice Removed successfully');
    res.sendStatus(200);
};

module.exports = {
    getHomepage,
    getDepartmentsPage,
    getModulesPage,
    getNotices,
    getAccountPage,
    getSpecificDept,
    getSpecificModule,
    addDepartment,
    addModule,
    adminLogin,
    deleteDepartment,
    deleteModule,
    deleteNotice,
    updateAccount,
    updateDepartment,
    updateModule,
    uploadNotice
};
