import { ObjectId } from 'mongodb';

export default class Student {
  constructor(
    public firstName: string,
    public lastName: string,
    public nationalCode: string,
    public phoneNumber: string,
    public fatherName: string,
    public schoolName: string,
    public educationalLevel: string,
    public _id: ObjectId
  ) {}
}
