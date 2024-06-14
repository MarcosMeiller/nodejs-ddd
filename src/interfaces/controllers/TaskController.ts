import { Request, Response } from "express";
import { TaskApplicationService } from "../../application/services/TaskApplicationService";

export class TaskController {
    constructor(private taskApplicationService: TaskApplicationService) {}

    async create(req: Request, res: Response): Promise<void> {
        const { title, description, dueDate, status, assigneeId, projectId } = req.body;
        const task = await this.taskApplicationService.create(title, description, dueDate, status, assigneeId, projectId);
        res.status(201).send({ task });
    }

    async findById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const task = await this.taskApplicationService.findById(id);
        if (task) {
            res.status(200).send({ task });
        } else {
            res.status(404).send({ message: "Task not found" });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { title, description, dueDate, status, assigneeId, projectId } = req.body;
        const task = await this.taskApplicationService.update(id, title, description, dueDate, status, assigneeId, projectId);
        if (task) {
            res.status(200).send({ task });
        } else {
            res.status(404).send({ message: "Task not found" });
        }
    }

    async findAll(req: Request, res: Response): Promise<void> {
        const tasks = await this.taskApplicationService.findAll();
        res.status(200).send({ tasks });
    }

    async deleteById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await this.taskApplicationService.deleteById(id);
        res.status(204).send();
    }

    async findByAssignee(req: Request, res: Response): Promise<void> {
        const { assigneeId } = req.params;
        const tasks = await this.taskApplicationService.findByAssignee(assigneeId);
        res.status(200).send({ tasks });
    }

    async findByProject(req: Request, res: Response): Promise<void> {
        const { projectId } = req.params;
        const tasks = await this.taskApplicationService.findByProject(projectId);
        res.status(200).send({ tasks });
    }
}
