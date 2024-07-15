const { body, validationResult } = require('express-validator');
const config = require('../config/config')


const validateTask = [
    body('userId').notEmpty().withMessage('User ID is required')
    .isString().withMessage('User ID must be a string'),

    body('description').optional().isString().withMessage('Description must be a string'),

    body('dueDate').optional().isDate().withMessage('Due Date must be in Date format'),

    body('status').notEmpty().withMessage('Status is required')
    .isIn(config.commonVariables.statusList)
    .withMessage('Invalid status'),

    body('priority').notEmpty().withMessage('Priority is required')
    .isIn(config.commonVariables.priorityList)
    .withMessage('Invalid Priority.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateTask;