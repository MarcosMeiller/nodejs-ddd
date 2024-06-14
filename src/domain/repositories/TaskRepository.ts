import { Task } from '../entities/Task';

export interface TaskRepository {
  findById(id: string): Promise<Task | null>;
  save(task: Task): Promise<void>;
  deleteById(id: string): Promise<void>;
  findByAssignee(assigneeId: string): Promise<Task[]>;
  findByProject(projectId: string): Promise<Task[]>
  findAll(): Promise<Task[]>
  update(id: string, title: string, description: string, dueDate: Date, status: string, assigneeId: string, projectId: string): Promise<Task | null>;
}
