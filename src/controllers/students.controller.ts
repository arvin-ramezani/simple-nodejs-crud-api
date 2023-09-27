import { Request, Response } from 'express';

export const getStudents = async (req: Request, res: Response) => {
  try {
    res.send('Get All Students');
  } catch (error) {}
};

export const createStudents = async (req: Request, res: Response) => {
  try {
    res.send('Create Student');
  } catch (error) {}
};

export const editStudents = async (req: Request, res: Response) => {
  try {
    res.send('Edit Student');
  } catch (error) {}
};

export const deleteStudents = async (req: Request, res: Response) => {
  try {
    res.send('Delete Student');
  } catch (error) {}
};
