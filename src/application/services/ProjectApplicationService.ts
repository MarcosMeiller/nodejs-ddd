import { ProjectRepository } from '../../domain/repositories/ProjectRepository';
import { Project } from '../../domain/entities/Project';

export class ProjectApplicationService {
    constructor(private readonly projectService: ProjectRepository) {

    }

    async create(title: string, description: string, dueDate: Date): Promise<Project> {
        const project = new Project(title, description, dueDate, 'not started', []);
        await this.projectService.save(project);
        return project;
    }

    async findById(id: string): Promise<Project | null> {
        const project = await this.projectService.findById(id);
        return project;
    }

    async findAll(): Promise<Project[]> {
        const projects = await this.projectService.findAll();
        return projects;
    }


    async deleteById(id: string): Promise<void> {
        await this.projectService.deleteById(id);
    }
}
