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

router.get('/', getAllStudents);
router.get('/:id', validateGetStudentMiddlewares, getStudent);

router.post('/', validateCreateStudentMiddlewares, createStudent);

router.patch('/:id', validateEditStudentMiddlewares, editStudents);

router.delete('/:id', validateDeleteStudentMiddlewares, deleteStudents);

export default router;
