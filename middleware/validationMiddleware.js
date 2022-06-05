const validation = require('../Security/validation');
const ExpressError = require('../utility/error/ExpressError');


const validateModules = (req, res, next) => {
    if (Object.keys(req.query).length === 0) next();
    else {
        const { error } = validation.moduleSchema.validate(req.query);
        if (error) {
            const msg = error.details.map(el => el.message).join(',');
            throw new ExpressError(400, msg);
        } else next();
    }
};


const validateDegree = (req, res, next) => {
    if (Object.keys(req.query).length === 0) next();
    else {
        const { error } = validation.degreeSchema.validate(req.query);
        if (error) {
            const msg = error.details.map(el => el.message).join(',');
            throw new ExpressError(400, msg);
        } else next();
    }
};

const validatePdf = (req, res, next) => {
    const { error } = validation.pdfSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, msg);
    } else next();
};

const validateDepartmentRetrieval = (req, res, next) => {
    const { error } = validation.departmentSchema.validate(req.params);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, msg);
    } else next();
};


const validateLogin = (req, res, next) => {
    const { error } = validation.loginSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(401, msg);
    } else next();
};

const validateNewDept = (req, res, next) => {
    const { error } = validation.newDepartmentSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, msg);
    } else next();
};


const validateNewModule = (req, res, next) => {
    const { error } = validation.newModuleSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, msg);
    } else next();
};

const validateAdminAcc = (req, res, next) => {
    const { error } = validation.adminAccSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, msg);
    } else next();
}


module.exports = {
    validateDegree,
    validateModules,
    validatePdf,
    validateDepartmentRetrieval,
    validateLogin,
    validateNewDept,
    validateNewModule,
    validateAdminAcc
};