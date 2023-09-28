import { CustomError } from './custom-error';

export class ConflictError extends CustomError {
  statusCode = 409;
  message = 'Already Exist';

  constructor(message?: string) {
    super();

    message && (this.message = message);

    Object.setPrototypeOf(this, ConflictError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
