import { Router } from 'express';

import {
  createStudents,
  deleteStudents,
  editStudents,
  getStudents,
} from '@/controllers/students.controller';

const router = Router();

router.get('/', getStudents);
router.post('/', createStudents);
router.patch('/', editStudents);
router.delete('/', deleteStudents);

export default router;
