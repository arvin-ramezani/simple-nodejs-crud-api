import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import 'module-alias/register';
import 'express-async-errors';

import studentsRoutes from '@/routes/students.routes';
import seedStudentsRoutes from '@/routes/seed-students.routes';
import { errorHandler } from './middlewares/error-handler.middleware';
import { NotFoundError } from './errors/not-found.error';
import swaggerDocs from '@/utils/swagger';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.use('/api/seed-students', seedStudentsRoutes);
app.use('/api', studentsRoutes);
swaggerDocs(app, +port);

app.all('*', async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app, port };
