import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { userRoutes } from './interfaces/routes/userRoutes';
import { taskRoutes } from './interfaces/routes/taskRoutes';
import { projectRoutes } from './interfaces/routes/projectRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/projects', projectRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/project_management';

mongoose.connect(MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
  .catch(err => console.error('Database connection error:', err));
