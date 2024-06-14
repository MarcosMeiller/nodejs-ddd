import { Project } from '../entities/Project';

export interface ProjectRepository {
  findById(id: string): Promise<Project | null>;
  findAll(): Promise<Project[]>
  save(project: Project): Promise<void>;
  deleteById(id: string): Promise<void>;

}
