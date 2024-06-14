import { Request, Response } from 'express';
import { UserApplicationService } from '../../application/services/UserApplicationService';

export class UserController {
  constructor(private userApplicationService: UserApplicationService) {}

  async prueba(req: Request, res: Response): Promise<void> {
    res.send('prueba');
  }

  async register(req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body;
    const token = await this.userApplicationService.register(username, email, password);
    res.status(201).send({ token });
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const token = await this.userApplicationService.login(email, password);
    if (token) {
      res.status(200).send({ token });
    } else {
      res.status(401).send({ message: 'Invalid credentials' });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    const users = await this.userApplicationService.findAll();
    res.status(200).send({ users });
  }
}
