const { body, param, validationResult } = require("express-validator");

const createRules = [
    body("name").trim().notEmpty().withMessage("name is required"),
    body("series").trim().notEmpty().withMessage("series is required"),
];

const updateRules = [
    body("name").optional().trim().notEmpty().withMessage("name cannot be empty"),
    body("series").optional().trim().notEmpty().withMessage("series cannot be empty"),
];

const idParamRule = [param("id").isInt({ min: 1 }).withMessage("id must be a positive integer")];

function validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map((e) => e.msg) });
    }
    next();
}

module.exports = { createRules, updateRules, idParamRule, validate };