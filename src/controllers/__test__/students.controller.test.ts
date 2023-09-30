import { expect, it, vi, describe, beforeEach, MockedFunction } from 'vitest';
import { Request, Response } from 'express';
import { validationResult, Result, ValidationError } from 'express-validator';

import STUDENTS from '@/utils/dummyData';
import {
  createStudent,
  deleteStudent,
  editStudents,
  getAllStudents,
  getStudent,
} from '@/controllers/students.controller';
import { Student, StudentDoc } from '@/models/student.model';
import { RequestValidationError } from '@/errors/request-validation.error';
import { NotFoundError } from '@/errors/not-found.error';

const mockStudents = () => [...STUDENTS];

vi.mock('express-validator');

vi.mock('@/errors/request-validation.error');
vi.mock('@/errors/not-found.error');

const mockValidationResult = validationResult as MockedFunction<
  typeof validationResult
>;

const mockReturnedValidationResult = {
  isEmpty: vi.fn(() => true),
  array: vi.fn(() => []),
} as unknown as Result<ValidationError>;

const createMockReq = () =>
  ({
    params: {
      id: 'validMongoId',
    },
    body: {
      ...mockStudents()[0],
    },
  } as unknown as Request);

const createMockRes = () =>
  ({
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  } as unknown as Response);

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('getAllStudent', () => {
  it('should return a list of all students when database is not empty', async () => {
    vi.spyOn(Student, 'find').mockResolvedValueOnce(mockStudents());

    const req = createMockReq();
    const res = createMockRes();

    await getAllStudents(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockStudents());
  });

  it('should return a empty list when database is empty', async () => {
    const mockEmptyStudents: [] = [];
    vi.spyOn(Student, 'find').mockResolvedValueOnce(mockEmptyStudents);

    const req = createMockReq();
    const res = createMockRes();

    await getAllStudents(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
  });
});

describe('getStudent', () => {
  it('should call validationResult and pass request as params to it', async () => {
    const req = createMockReq();
    const res = createMockRes();
    const next = vi.fn();

    vi.spyOn(Student, 'findById').mockResolvedValueOnce(null);

    await getStudent(req, res, next);

    expect(validationResult).toHaveBeenCalledWith(req);
  });

  it('should return a student object when given a valid id', async () => {
    vi.spyOn(Student, 'findById').mockResolvedValueOnce(mockStudents()[0]);

    const req = createMockReq();
    const res = createMockRes();
    const next = vi.fn();

    await getStudent(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockStudents()[0]);
  });

  it('should call ValidationError when an invalid student ID provided in request.params', async () => {
    vi.spyOn(Student, 'findById').mockResolvedValueOnce(null);

    const req = (createMockReq().params.id = 'inValidId') as unknown as Request;
    const res = createMockRes();
    const next = vi.fn();

    mockValidationResult.mockReturnValue({
      ...mockReturnedValidationResult,
      isEmpty: () => false,
    } as unknown as Result<ValidationError>);

    await getStudent(req, res, next);

    expect(RequestValidationError).toHaveBeenCalled();
  });

  it('should call NotFoundError when no student is found in database', async () => {
    const req = createMockReq();
    const res = createMockRes();
    const next = vi.fn();

    vi.spyOn(Student, 'findById').mockResolvedValueOnce(null);

    await getStudent(req, res, next);

    expect(NotFoundError).toHaveBeenCalled();
  });
});

describe('createStudent', () => {
  const mockCreatedStudent = {
    ...mockStudents()[0],
    save: vi.fn(),
  } as unknown as StudentDoc;

  it('should call validationResult and pass request as params to it', async () => {
    vi.spyOn(Student, 'build').mockReturnValueOnce(mockCreatedStudent);

    const req = (createMockReq().body =
      mockStudents()[0] as unknown as Request);
    const res = createMockRes();
    const next = vi.fn();

    await createStudent(req, res, next);

    expect(validationResult).toHaveBeenCalledWith(req);
  });

  it('should create new student if valid body provided', async () => {
    vi.spyOn(Student, 'build').mockReturnValueOnce(mockCreatedStudent);

    const req = (createMockReq().body =
      mockStudents()[0] as unknown as Request);
    const res = createMockRes();
    const next = vi.fn();

    await createStudent(req, res, next);

    expect(Student.build).toHaveBeenCalledWith(req.body);
    expect(mockCreatedStudent.save).toHaveBeenCalled();
  });

  it('should return a 201 status code and the created student object when valid request body provided', async () => {
    vi.spyOn(Student, 'build').mockReturnValueOnce(mockCreatedStudent);

    const req = (createMockReq().body =
      mockStudents()[0] as unknown as Request);
    const res = createMockRes();
    const next = vi.fn();

    await createStudent(req, res, next);

    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledWith(mockCreatedStudent);
  });

  it('should call RequestValidationError when invalid request body provided', async () => {
    vi.spyOn(Student, 'build').mockReturnValue(mockCreatedStudent);

    const req = createMockReq();
    const res = createMockRes();
    const next = vi.fn();

    mockValidationResult.mockReturnValue({
      ...mockReturnedValidationResult,
      isEmpty: () => false,
    } as unknown as Result<ValidationError>);

    await createStudent(req, res, next);

    expect(RequestValidationError).toHaveBeenCalled();
  });
});

describe('editStudent', () => {
  const existStudentToEdit = {
    ...mockStudents()[0],
    save: vi.fn(),
  };

  const mockEditStudent = {
    firstName: 'editedFirstName',
    lastName: 'editedLastName',
    nationalCode: '123456',
    phoneNumber: '123456789',
    fatherName: 'editedFatherName',
    schoolName: 'Edited School',
    educationalLevel: 'Edited Educational Level',
  };

  const req = {
    ...createMockReq(),
    body: {
      ...mockEditStudent,
    },
  } as unknown as Request;

  it('should call RequestValidationError with req', async () => {
    vi.spyOn(Student, 'findById').mockResolvedValueOnce(existStudentToEdit);
    const res = createMockRes();
    const next = vi.fn();

    await editStudents(req, res, next);

    expect(validationResult).toHaveBeenCalledWith(req);
  });

  it('should properly edit existing student with provided req.body when valid body is provided', async () => {
    vi.spyOn(Student, 'findById').mockResolvedValueOnce(existStudentToEdit);

    const res = createMockRes();
    const next = vi.fn();

    await editStudents(req, res, next);

    expect(existStudentToEdit.save).toBeCalled();
    expect(existStudentToEdit.firstName).toBe(mockEditStudent.firstName);
    expect(existStudentToEdit.lastName).toBe(mockEditStudent.lastName);
    expect(existStudentToEdit.nationalCode).toBe(mockEditStudent.nationalCode);
    expect(existStudentToEdit.phoneNumber).toBe(mockEditStudent.phoneNumber);
    expect(existStudentToEdit.fatherName).toBe(mockEditStudent.fatherName);
    expect(existStudentToEdit.schoolName).toBe(mockEditStudent.schoolName);
    expect(existStudentToEdit.educationalLevel).toBe(
      mockEditStudent.educationalLevel
    );
    expect(existStudentToEdit.save).toBeCalled();
  });

  it('should return edited student in response with 200 status code when valid req.body provided', async () => {
    vi.spyOn(Student, 'findById').mockResolvedValueOnce(existStudentToEdit);

    const res = createMockRes();
    const next = vi.fn();

    await editStudents(req, res, next);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(existStudentToEdit);
  });

  it('should call a RequestValidationError when invalid student id provided in req.params', async () => {
    vi.spyOn(Student, 'findById').mockResolvedValueOnce(existStudentToEdit);

    mockValidationResult.mockReturnValue({
      ...mockReturnedValidationResult,
      isEmpty: () => false,
    } as unknown as Result<ValidationError>);

    const res = createMockRes();
    const next = vi.fn();

    await editStudents(req, res, next);

    expect(RequestValidationError).toBeCalled();
  });

  it('should call a NotFoundError when a student does not exist with the provided student ID', async () => {
    vi.spyOn(Student, 'findById').mockResolvedValueOnce(null);
    const res = createMockRes();
    const next = vi.fn();

    await editStudents(req, res, next);

    expect(NotFoundError).toBeCalled();
  });
});

describe('deleteStudent', () => {
  const mockDeleteResult = {
    acknowledged: true,
    deletedCount: 1,
  };

  it('should call validationResult with request', async () => {
    vi.spyOn(Student, 'findById').mockResolvedValueOnce(mockStudents()[0]);
    vi.spyOn(Student, 'deleteOne').mockResolvedValueOnce(mockDeleteResult);

    const req = createMockReq();
    const res = createMockRes();
    const next = vi.fn();

    await deleteStudent(req, res, next);

    expect(validationResult).toBeCalledWith(req);
  });

  it('should call Student.findById with provided params.id', async () => {
    vi.spyOn(Student, 'findById').mockResolvedValueOnce(mockStudents()[0]);
    vi.spyOn(Student, 'deleteOne').mockResolvedValueOnce(mockDeleteResult);

    const req = createMockReq();
    const res = createMockRes();
    const next = vi.fn();

    await deleteStudent(req, res, next);

    expect(Student.findById).toBeCalledWith(req.params.id);
  });

  it('should call Student.deleteOne with provided params.id', async () => {
    vi.spyOn(Student, 'findById').mockResolvedValueOnce(mockStudents()[0]);
    vi.spyOn(Student, 'deleteOne').mockResolvedValueOnce(mockDeleteResult);

    const req = createMockReq();
    const res = createMockRes();
    const next = vi.fn();

    const deleteQuery = { id: req.params.id };

    await deleteStudent(req, res, next);

    expect(Student.deleteOne).toBeCalledWith(deleteQuery);
  });

  it('should return response with status code 200 when student deleted successfully', async () => {
    vi.spyOn(Student, 'findById').mockResolvedValueOnce(mockStudents()[0]);
    vi.spyOn(Student, 'deleteOne').mockResolvedValueOnce(mockDeleteResult);

    const req = createMockReq();
    const res = createMockRes();
    const next = vi.fn();

    await deleteStudent(req, res, next);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalled();
  });

  it('should call RequestValidationError when invalid req.params.id provided', async () => {
    vi.spyOn(Student, 'findById').mockResolvedValueOnce(mockStudents()[0]);
    vi.spyOn(Student, 'deleteOne').mockResolvedValueOnce(mockDeleteResult);

    mockValidationResult.mockReturnValue({
      ...mockReturnedValidationResult,
      isEmpty: () => false,
    } as unknown as Result<ValidationError>);

    const req = createMockReq();
    const res = createMockRes();
    const next = vi.fn();

    await deleteStudent(req, res, next);

    expect(RequestValidationError).toBeCalled();
  });

  it('should call NotFoundError when a student does not exist with the provided student ID', async () => {
    vi.spyOn(Student, 'findById').mockResolvedValueOnce(null);
    vi.spyOn(Student, 'deleteOne').mockResolvedValueOnce(mockDeleteResult);

    const req = createMockReq();
    const res = createMockRes();
    const next = vi.fn();

    await deleteStudent(req, res, next);

    expect(NotFoundError).toBeCalled();
  });
});
