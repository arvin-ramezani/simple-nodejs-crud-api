import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ObjectId } from 'mongodb';

import { collections } from '@/utils/connectToDB';
import Student from '@/models/student.model';
import { RequestValidationError } from '@/errors/request-validation.error';
import { NotFoundError } from '@/errors/not-found.error';
import { ServerError } from '@/errors/server.error';

interface CreateStudentRequest extends Request {
  body: Student;
}

interface EditStudentRequest extends Request {
  body: Partial<Student>;
}

export const getAllStudents = async (_req: Request, res: Response) => {
  const studentsList = await collections.students!.find({}).toArray();

  res.status(200).json(studentsList);
};

export const getStudent = async (req: Request, res: Response) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    throw new RequestValidationError(validationErrors.array());
  }

  const id = new ObjectId(req.params.id);

  const student = await collections.students!.findOne({
    _id: id,
  });

  if (!student) throw new NotFoundError(`Student with id ${id} not found.`);

  res.status(200).json(student);
};

export const createStudent = async (
  req: CreateStudentRequest,
  res: Response
) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    throw new RequestValidationError(validationErrors.array());
  }

  const studentToCreate = req.body;

  const result = await collections.students!.insertOne(studentToCreate);

  if (!result || !result.insertedId)
    throw new ServerError('Failed to create student.');

  res.status(201).json(studentToCreate);
};

export const editStudents = async (req: EditStudentRequest, res: Response) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    throw new RequestValidationError(validationErrors.array());
  }

  const id = new ObjectId(req.params.id);
  const studentToEdit = req.body;

  const existingStudent = await collections.students!.findOne({ _id: id });

  if (!existingStudent)
    throw new NotFoundError(`Student with id ${id} not found.`);

  const result = await collections.students!.updateOne(
    { _id: existingStudent._id },
    { $set: studentToEdit }
  );

  if (!result || result.modifiedCount < 1) {
    throw new ServerError(`Failed to update student with id ${id}.`);
  }

  const editedStudent = { ...existingStudent, ...studentToEdit };

  res.status(200).json(editedStudent);
};

export const deleteStudents = async (req: Request, res: Response) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    throw new RequestValidationError(validationErrors.array());
  }

  const id = new ObjectId(req.params.id);

  const existingStudent = await collections.students!.findOne({ _id: id });

  if (!existingStudent)
    throw new NotFoundError(`Student with id ${id} not found.`);

  const result = await collections.students!.deleteOne({
    _id: existingStudent._id,
  });

  if (!result || result.deletedCount < 1) {
    throw new ServerError(`Failed to delete student with id ${id}.`);
  }

  res
    .status(200)
    .json({ message: `Student with id ${id} deleted successfully.` });
};
