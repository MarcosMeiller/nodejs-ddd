import express from 'express';
import { TaskController } from "../controllers/TaskController";
import { MongooseTaskRepository } from "../../infrastructure/persistence/MongooseTaskRepository";
import { TaskApplicationService } from "../../application/services/TaskApplicationService";
import { authenticateToken } from '../../middleware/AuthMiddleware';

const taskRoutes = express.Router();

const taskRepository = new MongooseTaskRepository();
const taskApplicationService = new TaskApplicationService(taskRepository);
const taskController = new TaskController(taskApplicationService);

taskRoutes.post('/', authenticateToken , (req, res) => taskController.create(req, res));
taskRoutes.get('/', authenticateToken ,(req, res) => taskController.findAll(req, res));
taskRoutes.get('/:id', authenticateToken ,(req, res) => taskController.findById(req, res));
taskRoutes.delete('/:id', authenticateToken ,(req, res) => taskController.deleteById(req, res));
taskRoutes.put('/:id', authenticateToken ,(req, res) => taskController.update(req, res));
taskRoutes.get('/assignee/:assigneeId', authenticateToken ,(req, res) => taskController.findByAssignee(req, res));
taskRoutes.get('/project/:projectId', authenticateToken ,(req, res) => taskController.findByProject(req, res));

export { taskRoutes };