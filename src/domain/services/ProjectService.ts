import { Project } from "../entities/Project";
import { ProjectRepository } from "../repositories/ProjectRepository";

export class ProjectService {
    deleteById(id: string) {
        throw new Error('Method not implemented.');
    }
    constructor(private readonly projectRepository: ProjectRepository) {}

    async create(title: string, description: string, dueDate: Date): Promise<string> {
        const project = new Project(title, description, dueDate, 'not started', []);
        await this.projectRepository.save(project);
        return project.title;
    }

    async findById(id: string): Promise<Project | null> {
        return this.projectRepository.findById(id);
    }

    async findAll(): Promise<Project[]> {
        return this.projectRepository.findAll();
    }
}