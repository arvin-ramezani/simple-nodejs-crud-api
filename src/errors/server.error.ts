import { CustomError } from './custom-error';

export class ServerError extends CustomError {
  statusCode = 500;
  message = 'Something went wrong';

  constructor(message?: string) {
    super();

    message && (this.message = message);

    Object.setPrototypeOf(this, ServerError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
