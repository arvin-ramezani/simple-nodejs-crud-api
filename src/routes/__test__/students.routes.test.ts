import { StudentDoc } from './../../models/student.model';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import mongoose from 'mongoose';

import { app } from '@/app';
import STUDENTS from '@/utils/dummyData';
import { StudentAttrs } from '@/models/student.model';
import { errorHandler } from '@/middlewares/error-handler.middleware';

const mockedStudents = () => [...STUDENTS];

const seedStudents = () => request(app).post('/api/seed-students');

beforeEach(async () => {
  await seedStudents();
});

describe('GET /api', () => {
  it('should return 200 status code and a list of all students', async () => {
    const { body } = await request(app).get('/api').expect(200);
    expect(body).toHaveLength(mockedStudents().length);
  });
});

describe('GET /api/:id', () => {
  it('should return a 200 status code and student based on the id provided in params', async () => {
    seedStudents();
    const { body } = await request(app).get('/api/');

    const studentToGet = body[0];

    return request(app)
      .get(`/api/${studentToGet.id}`)
      .expect(200)
      .then(({ body }) => {
        body.firstName = studentToGet.firstName;
        body.lastName = studentToGet.lastName;
        body.nationalCode = studentToGet.nationalCode;
        body.phoneNumber = studentToGet.phoneNumber;
        body.fatherName = studentToGet.fatherName;
        body.schoolName = studentToGet.schoolName;
      });
  });

  it('should return a 400 status code when invalid student ID is provided as params', async () => {
    return request(app).get('/api/invalid-id').expect(400);
  });

  it('should return a 404 status code when given student ID not found in database', async () => {
    const notFoundId = new mongoose.mongo.ObjectId();

    return request(app).get(`/api/${notFoundId}`).expect(404);
  });
});

describe('POST /', () => {
  const studentToCreate: StudentAttrs = {
    firstName: 'New First Name',
    lastName: 'New Last Name',
    nationalCode: '123456123',
    phoneNumber: '123456789',
    fatherName: 'New Father Name',
    schoolName: 'New School Name',
    educationalLevel: 'New Educational Name',
  };

  it('should return a 201 status code and created student object', async () => {
    const { body } = await request(app)
      .post('/api')
      .send({ ...studentToCreate })
      .expect(201);
    expect(body).toEqual({ ...studentToCreate, id: body.id });
  });

  it('should save created student object in database', async () => {
    const { body: createdStudent } = await request(app)
      .post('/api')
      .send({ ...studentToCreate })
      .expect(201);
    expect(createdStudent).toEqual({
      ...studentToCreate,
      id: createdStudent.id,
    });

    return request(app)
      .get(`/api/${createdStudent.id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(createdStudent);
      });
  });

  it('should return a 409 status code when national code already exists in the database', async () => {
    await request(app)
      .post('/api')
      .send({ ...studentToCreate })
      .expect(201);

    await request(app)
      .post('/api')
      .send({ ...studentToCreate })
      .expect(409);
  });

  it('should return a 400 status code if invalid body provided', async () => {
    return request(app).post('/api').send({}).expect(400);
  });
});

describe('PATCH /api/:id', () => {
  const editStudentPayload: StudentAttrs = {
    firstName: 'Edit First Name',
    lastName: 'Edit Last Name',
    nationalCode: '123456123',
    phoneNumber: '123456789',
    fatherName: 'Edit Father Name',
    schoolName: 'Edit School Name',
    educationalLevel: 'Edit Educational Name',
  };

  it('should return a 200 status code and edited student object', async () => {
    const { body: studentList } = await request(app).get('/api');
    const studentToEditId = studentList[0].id;

    return request(app)
      .patch(`/api/${studentToEditId}`)
      .send({ ...editStudentPayload })
      .expect(200)
      .then(({ body }) => {
        expect(body.firstName).toBe(editStudentPayload.firstName);
        expect(body.lastName).toBe(editStudentPayload.lastName);
        expect(body.nationalCode).toBe(editStudentPayload.nationalCode);
        expect(body.phoneNumber).toBe(editStudentPayload.phoneNumber);
        expect(body.fatherName).toBe(editStudentPayload.fatherName);
        expect(body.schoolName).toBe(editStudentPayload.schoolName);
        expect(body.educationalLevel).toBe(editStudentPayload.educationalLevel);
      });
  });

  it('should save edited student in database', async () => {
    const { body: studentList } = await request(app).get('/api');
    const studentToEditId = studentList[0].id;

    const { body: editedStudent } = await request(app)
      .patch(`/api/${studentToEditId}`)
      .send({ ...editStudentPayload })
      .expect(200);

    return request(app)
      .get(`/api/${studentToEditId}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(editedStudent);
      });
  });

  it('should return a 400 status code when given student id is invalid in req.params', async () => {
    return request(app).patch('/api/invalid-id').expect(400);
  });

  it('should return a 400 status code when given req.body is invalid', async () => {
    const { body: studentList } = await request(app).get('/api');
    const studentToEditId = studentList[0].id;

    return request(app).patch(`/api/${studentToEditId}`).send({}).expect(400);
  });

  it('should return a 404 status code when given student ID is not found', async () => {
    const notFoundId = new mongoose.mongo.ObjectId();

    return request(app)
      .patch(`/api/${notFoundId}`)
      .send(editStudentPayload)
      .expect(404);
  });
});

describe('DELETE /api/:id', () => {
  it('should return a 200 status if valid student ID is provided in req.params', async () => {
    const { body: studentList } = await request(app).get('/api');
    const studentToDeleteId = studentList[0].id;

    return request(app).delete(`/api/${studentToDeleteId}`).expect(200);
  });

  it('should properly delete student from database', async () => {
    const { body: studentList } = await request(app).get('/api');
    const studentToDeleteId = studentList[0].id;

    await request(app).delete(`/api/${studentToDeleteId}`).expect(200);

    return request(app).get(`/api/${studentToDeleteId}`).expect(404);
  });

  it('should return a 400 status code when invalid student ID is provided in req.params', async () => {
    return request(app).delete('/api/invalid-id').expect(400);
  });

  it('should return 404 status code when given student ID not found in database', async () => {
    const notFoundId = new mongoose.mongo.ObjectId();

    return request(app).delete(`/api/${notFoundId}`).expect(404);
  });
});
