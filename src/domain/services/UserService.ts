import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async register(username: string, email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(username, email, hashedPassword);
    await this.userRepository.save(user);
    return user;
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
