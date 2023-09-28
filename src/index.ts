import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import 'module-alias/register';
import 'express-async-errors';

import studentsRoutes from '@/routes/students.routes';
import { errorHandler } from './middlewares/error-handler.middleware';
import { NotFoundError } from './errors/not-found.error';
import swaggerDocs from '@/utils/swagger';

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.use('/api', studentsRoutes);
swaggerDocs(app, +port);

app.all('*', async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

async function start() {
  try {
    await mongoose.connect(process.env.DB_CONN_STRING!);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Database connection failed', error);
  }

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}

start();
