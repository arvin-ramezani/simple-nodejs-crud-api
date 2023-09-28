import mongoose from 'mongoose';

export interface StudentAttrs {
  firstName: string;
  lastName: string;
  nationalCode: string;
  phoneNumber: string;
  fatherName: string;
  schoolName: string;
  educationalLevel: string;
}

// Student collection properties and methods.
// Student model interface
export interface StudentModel extends mongoose.Model<StudentDoc> {
  build(attrs: StudentAttrs): StudentDoc;
}

// What properties a single Student has.
// Student DOC interface
export interface StudentDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  nationalCode: string;
  phoneNumber: string;
  fatherName: string;
  schoolName: string;
  educationalLevel: string;
}

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    nationalCode: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    schoolName: {
      type: String,
      required: true,
    },
    educationalLevel: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = doc._id;
        delete ret._id;
      },
      versionKey: false,
    },
  }
);

// DeprecationWarning for mongoose 7.
mongoose.set('strictQuery', true);

studentSchema.statics.build = (attrs: StudentAttrs) => {
  return new Student({ ...attrs });
};

const Student =
  (mongoose.models.Student as StudentModel) ||
  mongoose.model<StudentDoc, StudentModel>('Food', studentSchema);

export { Student };
