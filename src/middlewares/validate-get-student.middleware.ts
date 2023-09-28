import { ObjectId } from 'mongodb';
import { param } from 'express-validator';

export default [
  param('id')
    .custom((id) => ObjectId.isValid(id))
    .withMessage(
      'Invalid request parameter: Please provide a valid MongoDB ObjectId for the student Id.'
    ),
];
