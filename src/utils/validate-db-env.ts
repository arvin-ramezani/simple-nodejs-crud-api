import { ServerError } from '@/errors/server.error';

export default function validateDbEnvVariables() {
  if (
    !process.env.DB_CONN_STRING ||
    !process.env.DB_NAME ||
    !process.env.STUDENTS_COLLECTION_NAME
  ) {
    throw new ServerError(
      'Please specify Database environment variables inside ".env" file.'
    );
  }
}
