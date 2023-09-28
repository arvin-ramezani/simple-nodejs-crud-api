import { ObjectId } from 'mongodb';
import { body, param } from 'express-validator';

export default [
  param('id')
    .custom((id) => ObjectId.isValid(id))
    .withMessage(
      'Invalid request parameter: Please provide a valid MongoDB ObjectId for the student Id.'
    ),

  body('firstName')
    .optional()
    .notEmpty()
    .withMessage(
      'Please provide a valid first name or remove the field entirely.'
    )
    .isString()
    .withMessage('First name must be a string.')
    .trim()
    .isLength({ min: 3 })
    .withMessage('First name should be at least 3 characters.'),

  body('lastName')
    .optional()
    .notEmpty()
    .withMessage(
      'Please provide a valid last name or remove the field entirely.'
    )
    .isString()
    .withMessage('Last name must be a string.')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Last name should be at least 3 characters.'),

  body('nationalCode')
    .optional()
    .notEmpty()
    .withMessage(
      'Please provide a valid national code or remove the field entirely.'
    )
    .trim()
    .isLength({ min: 8 })
    .withMessage('National code should be at least 8 characters.')
    .isString()
    .withMessage('National code must be a string.'),

  body('phoneNumber')
    .optional()
    .notEmpty()
    .withMessage(
      'Please provide a valid phone number or remove the field entirely.'
    )
    .trim()
    .isLength({ min: 8 })
    .withMessage('Phone number should be at least 8 characters.')
    .isString()
    .withMessage('Phone number must be a string.'),

  body('fatherName')
    .optional()
    .notEmpty()
    .withMessage(
      'Please provide a valid father name or remove the field entirely.'
    )
    .trim()
    .isLength({ min: 3 })
    .withMessage('Father name should be at least 3 characters.')
    .isString()
    .withMessage('Father name must be a string.'),

  body('schoolName')
    .optional()
    .notEmpty()
    .withMessage(
      'Please provide a valid school name or remove the field entirely.'
    )
    .trim()
    .isLength({ min: 3 })
    .withMessage('School name should be at least 3 characters.')
    .isString()
    .withMessage('School name must be a string.'),

  body('educationalLevel')
    .optional()
    .notEmpty()
    .withMessage(
      'Please provide a valid educational level or remove the field entirely.'
    )
    .trim()
    .isLength({ min: 3 })
    .withMessage('Educational level should be at least 3 characters.')
    .isString()
    .withMessage('Educational level must be a string.'),
];
