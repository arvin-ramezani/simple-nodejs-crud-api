import express, { Application } from 'express';
import dotenv from 'dotenv';
import 'module-alias/register';
import 'express-async-errors';

import studentsRoutes from '@/routes/students.routes';
import seedStudentsRoutes from '@/routes/seed-students.routes';
import { connectToDatabase } from './utils/connectToDB';
import { errorHandler } from './middlewares/error-handler.middleware';
import { NotFoundError } from './errors/not-found.error';

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use('/api/seed-students', seedStudentsRoutes);
app.use('/api', studentsRoutes);

app.all('*', async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

const port = process.env.PORT || 3000;

(async function start() {
  try {
    await connectToDatabase();

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Database connection failed', error);

    process.exit();
  }
})();
