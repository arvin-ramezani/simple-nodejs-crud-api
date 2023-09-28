import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { Student, StudentAttrs } from '@/models/student.model';
import { RequestValidationError } from '@/errors/request-validation.error';
import { NotFoundError } from '@/errors/not-found.error';

interface CreateStudentRequest extends Request {
  body: StudentAttrs;
}

interface EditStudentRequest extends Request {
  body: Partial<StudentAttrs>;
}

export const getAllStudents = async (_req: Request, res: Response) => {
  // const studentsList = await collections.students!.find({}).toArray();
  const studentsList = await Student.find({});

  res.status(200).json(studentsList);
};

export const getStudent = async (req: Request, res: Response) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    throw new RequestValidationError(validationErrors.array());
  }

  const id = req.params.id;

  const student = await Student.findById(id);

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

  const newStudent = Student.build(studentToCreate);
  await newStudent.save();

  res.status(201).json(newStudent);
};

export const editStudents = async (req: EditStudentRequest, res: Response) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    throw new RequestValidationError(validationErrors.array());
  }

  const id = req.params.id;
  const studentToEdit = req.body;

  const existingStudent = await Student.findById(id);

  if (!existingStudent)
    throw new NotFoundError(`Student with id ${id} not found.`);

  existingStudent.firstName =
    studentToEdit.firstName || existingStudent.firstName;

  existingStudent.lastName = studentToEdit.lastName || existingStudent.lastName;

  existingStudent.nationalCode =
    studentToEdit.nationalCode || existingStudent.nationalCode;

  existingStudent.phoneNumber =
    studentToEdit.phoneNumber || existingStudent.phoneNumber;

  existingStudent.fatherName =
    studentToEdit.fatherName || existingStudent.fatherName;

  existingStudent.schoolName =
    studentToEdit.schoolName || existingStudent.schoolName;

  existingStudent.educationalLevel =
    studentToEdit.educationalLevel || existingStudent.educationalLevel;

  await existingStudent.save();

  res.status(200).json(existingStudent);
};

export const deleteStudents = async (req: Request, res: Response) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    throw new RequestValidationError(validationErrors.array());
  }

  const id = req.params.id;

  const existingStudent = await Student.findById(id);

  if (!existingStudent)
    throw new NotFoundError(`Student with id ${id} not found.`);

  await Student.deleteOne({ id });

  res
    .status(200)
    .json({ message: `Student with id ${id} deleted successfully.` });
};
