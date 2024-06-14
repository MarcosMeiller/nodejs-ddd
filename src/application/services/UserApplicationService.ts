import { UserService } from '../../domain/services/UserService';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import jwt from 'jsonwebtoken';

export class UserApplicationService {
  private userService: UserService;

  constructor(userRepository: UserRepository) {
    this.userService = new UserService(userRepository);
  }

  async register(username: string, email: string, password: string): Promise<string> {
    const user = await this.userService.register(username, email, password);
    return this.generateToken(user.email);
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.userService.authenticate(email, password);
    return user ? this.generateToken(user.email) : null;
  }

  private generateToken(userId: string): string {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', { expiresIn: '3h' });
  }

  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
