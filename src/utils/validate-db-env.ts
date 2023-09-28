import { ServerError } from '@/errors/server.error';

export default function validateDbEnvVariables() {
  if (!process.env.DB_CONN_STRING) {
    throw new ServerError(
      'Please specify Database environment variables inside ".env" file.'
    );
  }
}
