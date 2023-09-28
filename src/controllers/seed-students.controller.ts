import { Request, Response } from 'express';

import { Student } from '@/models/student.model';
import STUDENTS from '@/utils/dummyData';

export const seedStudents = async (req: Request, res: Response) => {
  await Student.deleteMany();

  const savePromises = STUDENTS.map((student) => {
    const newStudent = Student.build(student);
    return newStudent.save();
  });

  await Promise.all(savePromises);

  return res.status(201).send('Seed students successfully.');
};
