import { TaskRepository } from "../../domain/repositories/TaskRepository";
import { Task } from "../../domain/entities/Task";

export class TaskApplicationService {
    constructor(private taskRepository: TaskRepository) {}

    async create(title: string, description: string, dueDate: Date, status: string, assigneeId: string, projectId: string): Promise<Task> {
        const task = new Task(title, description, dueDate, status as 'not started' | 'in progress' | 'completed', assigneeId, projectId);
        await this.taskRepository.save(task);
        return task;
    }

    async findAll(): Promise<Task[]> {
        return await this.taskRepository.findAll();
    }

    async findById(id: string): Promise<Task | null> {
        return await this.taskRepository.findById(id);
    }

    async deleteById(id: string): Promise<void> {
        await this.taskRepository.deleteById(id);
    }

    async findByAssignee(assigneeId: string): Promise<Task[]> {
        return await this.taskRepository.findByAssignee(assigneeId);
    }

    async findByProject(projectId: string): Promise<Task[]> {
        return await this.taskRepository.findByProject(projectId);
    }

    async update(id: string, title: string, description: string, dueDate: Date, status: string, assigneeId: string, projectId: string): Promise<Task | null> {
        return await this.taskRepository.update(id, title, description, dueDate, status, assigneeId, projectId);
    }
}
