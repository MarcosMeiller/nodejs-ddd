import { User } from '../entities/User';

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
  deleteById(id: string): Promise<void>;
  deleteByEmail(email: string): Promise<void>;
  findAll(): Promise<User[]>;
}
