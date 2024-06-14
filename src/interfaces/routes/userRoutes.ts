import express from 'express';
import { UserController } from '../controllers/UserController';
import { MongooseUserRepository } from '../../infrastructure/persistence/MongooseUserRepository';
import { UserApplicationService } from '../../application/services/UserApplicationService';
import authenticateToken from '../../middleware/AuthMiddleware';

const userRoutes = express.Router();

const userRepository = new MongooseUserRepository();
const userApplicationService = new UserApplicationService(userRepository);
const userController = new UserController(userApplicationService);

userRoutes.get('/prueba', (req, res) => userController.prueba(req, res));
userRoutes.post('/register', (req, res) => userController.register(req, res));
userRoutes.post('/login', (req, res) => userController.login(req, res));
userRoutes.get('/',authenticateToken, (req, res) => userController.findAll(req, res));

export { userRoutes };
