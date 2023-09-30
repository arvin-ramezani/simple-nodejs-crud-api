import { NextFunction, Request, Response } from 'express';

import { CustomError } from '@/errors/custom-error';
import { ConflictError } from '@/errors/conflict.error';

export const errorHandler = (
  err: Error & { code: number; keyValue: { nationalCode: string } },
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Mongoose duplicate key error
  if (err.code === 11000) {
    const error = new ConflictError(
      `Student with national code ${err.keyValue.nationalCode} already exists.`
    );

    return res
      .status(error.statusCode)
      .send({ errors: error.serializeErrors() });
  }

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(500).json({ errors: [{ message: 'Something went wrong.' }] });
};
