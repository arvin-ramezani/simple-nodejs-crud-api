import { Router } from 'express';

import validateCreateStudentMiddlewares from '@/middlewares/validate-create-student.middleware';
import validateGetStudentMiddlewares from '@/middlewares/validate-get-student.middleware';
import validateEditStudentMiddlewares from '@/middlewares/validate-edit-student.middleware';
import validateDeleteStudentMiddlewares from '@/middlewares/validate-delete-student.middleware';
import {
  createStudent,
  deleteStudents,
  editStudents,
  getAllStudents,
  getStudent,
} from '@/controllers/students.controller';

const router = Router();

/**
 * @swagger
 * /api:
 *  get:
 *    tags:
 *      - Student
 *    summary: Get a list of students.
 *    responses:
 *      200:
 *        description: Returns a list of students.
 *      500:
 *        description: Something went wrong.
 */
router.get('/', getAllStudents);

/**
 * @swagger
 * /api/{id}:
 *  get:
 *    tags:
 *      - Student
 *    summary: Get a students by ID.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Id of the student.
 *        required: true
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/StudentResponse'
 *      400:
 *        description: Bad request (request params is not a valid mongoDB ObjectId).
 *      404:
 *        description: Student not found.
 *      500:
 *        description: Something went wrong.
 */
router.get('/:id', validateGetStudentMiddlewares, getStudent);

/**
 * @swagger
 * /api:
 *  post:
 *    tags:
 *      - Student
 *    summary: Create a student.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateStudentInput'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/StudentResponse'
 *      400:
 *        description: Bad request (Request body not valid)
 *      500:
 *        description: Something went wrong
 */
router.post('/', validateCreateStudentMiddlewares, createStudent);

/**
 * @swagger
 * /api/{id}:
 *  patch:
 *    tags:
 *      - Student
 *    summary: Edit a student.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Id of the student.
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/EditStudentInput'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/StudentResponse'
 *      400:
 *        description: Bad request (Request body not valid)
 *      404:
 *        description: Not found
 *      500:
 *        description: Something went wrong
 */
router.patch('/:id', validateEditStudentMiddlewares, editStudents);

/**
 * @swagger
 * /api/{id}:
 *  delete:
 *    tags:
 *      - Student
 *    summary: Delete a student.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Id of the student.
 *        required: true
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 message:
 *                   type: string
 *                   description: Delete message which includes deleted student Id.
 *      400:
 *        description: Bad request (Request body not valid)
 *      404:
 *        description: Not found
 *      500:
 *        description: Something went wrong
 */
router.delete('/:id', validateDeleteStudentMiddlewares, deleteStudents);

export default router;
