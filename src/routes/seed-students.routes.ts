import { Router } from 'express';
import { seedStudents } from '@/controllers/seed-students.controller';

const router = Router();

router.post('/', seedStudents);

export default router;
