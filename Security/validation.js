const joi = require('joi');

const moduleSchema = joi.object({
    department: joi.number().required().min(1).max(5),
    level: joi.number().required().min(1).max(4)
});

const degreeSchema = joi.object({
    level: joi.number().required().min(1).max(4),
    type: joi.number().min(1).max(3),
    selection: joi.string().required()
});

const pdfSchema = joi.object({
    personal: joi.object({
        name: joi.string().required(),
        regNo: joi.string().required(),
        contact: joi.string().required(),
        level: joi.number().min(1).max(4).required(),
        academicYear: joi.string(),
        degreeDetails: joi.object({
            degreeType: joi.string(),
            combination: joi.string().required()
        }).required()
    }), semester1: joi.object({
        mandatory: joi.array().required(),
        optional: joi.array()
    }), semester2: joi.object({
        mandatory: joi.array().required(),
        optional: joi.array()
    })
});

const departmentSchema = joi.object({
    id: joi.number().required().min(1).max(5)
});

const loginSchema = joi.object({
    username: joi.string().required(),
    pswrd: joi.string().required()
});

const newDepartmentSchema = joi.object({
    id: joi.number().required().min(1),
    name: joi.string().required()
});

const newModuleSchema = joi.object({
    code: joi.string().required(),
    name: joi.string().required(),
    credit: joi.number().required().min(0),
    level: joi.number().required().min(1).max(4),
    semester: joi.number().required().min(1).max(2),
    department: joi.number().required(),
    special_available: joi.boolean().required(),
    special_mandatory: joi.boolean().required(),
    m1_available: joi.boolean().required(),
    m1_mandatory: joi.boolean().required(),
    m2_available: joi.boolean().required(),
    m2_mandatory: joi.boolean().required(),
    general_available: joi.boolean().required(),
    general_mandatory: joi.boolean().required(),
    description: joi.string()
});


const updateDepartmentSchema = joi.object({
    deptID: joi.number().required().min(1),
    deptName: joi.string().required()
});

const updateModuleSchema = joi.object({
    code: joi.string().required(),
    name: joi.string().required(),
    credit: joi.number().required().min(0),
    level: joi.number().required().min(1).max(4),
    semester: joi.number().required().min(1).max(2),
    department: joi.number().required(),
    special_available: joi.boolean().required(),
    special_mandatory: joi.boolean().required(),
    m1_available: joi.boolean().required(),
    m1_mandatory: joi.boolean().required(),
    m2_available: joi.boolean().required(),
    m2_mandatory: joi.boolean().required(),
    general_available: joi.boolean().required(),
    general_mandatory: joi.boolean().required(),
    description: joi.string()
});

const adminAccSchema = joi.object({
    fName: joi.string().required(),
    lName: joi.string().required(),
    address: joi.string()
});

module.exports = {
    moduleSchema,
    pdfSchema,
    degreeSchema,
    departmentSchema,
    loginSchema,
    newDepartmentSchema,
    newModuleSchema,
    updateDepartmentSchema,
    updateModuleSchema,
    adminAccSchema
};