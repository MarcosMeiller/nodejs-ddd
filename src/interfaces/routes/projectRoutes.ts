import express from 'express';
import { ProjectController } from "../controllers/ProjectController";
import { MongooseProjectRepository } from "../../infrastructure/persistence/MongooseProjectRepository";
import { ProjectApplicationService } from "../../application/services/ProjectApplicationService";
import { authenticateToken } from '../../middleware/AuthMiddleware';


const projectRoutes = express.Router();

const projectRepository = new MongooseProjectRepository();
const projectApplicationService = new ProjectApplicationService(projectRepository);
const projectController = new ProjectController(projectApplicationService);

projectRoutes.post('/',authenticateToken ,(req, res) => projectController.create(req, res));
projectRoutes.get('/',authenticateToken ,(req, res) => projectController.findAll(req, res));
projectRoutes.delete('/:id',authenticateToken, (req, res) => projectController.findById(req, res));
//app.get('/projects/:assigneeId', (req, res) => projectController.findByAssignee(req, res));
//app.get('/projects/:projectId', (req, res) => projectController.findByProject(req, res));
    
export { projectRoutes };