import { TaskRepository } from "../repositories/TaskRepository";
import { Task } from "../entities/Task";
export class TaskService {
    constructor(private readonly taskRepository: TaskRepository) {}

    async create(title: string, description: string, dueDate: Date, assignee: string, projectId: string): Promise<string> {
        const task = new Task(title, description, dueDate, 'not started', assignee, projectId );
        await this.taskRepository.save(task);
        return task.title;
    }

}