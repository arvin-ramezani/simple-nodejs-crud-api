import { body } from 'express-validator';

export default [
  body('firstName')
    .trim()
    .isLength({ min: 3 })
    .withMessage('First name should be at least 3 characters.')
    .isString()
    .withMessage('First name must be a string.'),

  body('lastName')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Last name should be at least 3 characters.')
    .isString()
    .withMessage('Last name must be a string.'),

  body('nationalCode')
    .trim()
    .isLength({ min: 8 })
    .withMessage('National code should be at least 8 characters.')
    .isString()
    .withMessage('National code must be a string.'),

  body('phoneNumber')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Phone number should be at least 8 characters.')
    .isString()
    .withMessage('Phone number must be a string.'),

  body('fatherName')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Father name should be at least 3 characters.')
    .isString()
    .withMessage('Father name must be a string.'),

  body('schoolName')
    .trim()
    .isLength({ min: 3 })
    .withMessage('School name should be at least 3 characters.')
    .isString()
    .withMessage('School name must be a string.'),

  body('educationalLevel')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Educational level name should be at least 3 characters.')
    .isString()
    .withMessage('Educational level name must be a string.'),
];
