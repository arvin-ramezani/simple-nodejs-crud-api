import express, { Application } from 'express';
import dotenv from 'dotenv';
import 'module-alias/register';

import studentsRoutes from '@/routes/students.routes';

dotenv.config();

const app: Application = express();
app.use('/api', studentsRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
