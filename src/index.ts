import mongoose from 'mongoose';

import { app, port } from './app';
import validateDbEnvVariables from './utils/validate-db-env';

async function start() {
  try {
    validateDbEnvVariables();

    await mongoose.connect(process.env.DB_CONN_STRING!, {
      autoIndex: true,
    });

    console.log('Connected to MongoDB');

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Database connection failed', error);
  }
}

start();
