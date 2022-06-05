// const ExpressError = require('../error/ExpressError');
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
})

module.exports = { moduleSchema, pdfSchema, degreeSchema };