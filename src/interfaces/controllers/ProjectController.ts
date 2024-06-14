import { Request, Response } from "express";
import { ProjectApplicationService } from "../../application/services/ProjectApplicationService";

export class ProjectController {

    constructor(private projectService: ProjectApplicationService) {}

    async create(req: Request, res: Response): Promise<void> {
        const { title, description, dueDate } = req.body;
        const project = await this.projectService.create(title, description, dueDate);
        res.status(201).send({ project });
    }

    async findAll(req: Request, res: Response): Promise<void> {
        const projects = await this.projectService.findAll();
        res.status(200).send({ projects });
    }

    async findById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const project = await this.projectService.findById(id);
        if (project) {
            res.status(200).send({ project });
        } else {
            res.status(404).send({ message: "Project not found" });
        }
    }
    
}