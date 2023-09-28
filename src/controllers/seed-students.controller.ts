import { Request, Response } from 'express';

import Student from '@/models/student.model';
import { collections } from '@/utils/connectToDB';
import STUDENTS from '@/utils/dummyData';

export const seedStudents = async (req: Request, res: Response) => {
  try {
    const studentsList = STUDENTS;

    await collections.students!.deleteMany();
    const result = await collections.students!.insertMany(studentsList);

    result
      ? res
          .status(201)
          .send(`Successfully seed ${result.insertedCount} student documents.`)
      : res.status(500).send('Failed to create a new game.');
  } catch (error) {
    console.error(error, 'seed');
    res.status(400).send(error);
  }
};
