import { Task } from "../../domain/entities/Task";
import mongoose, { Document, Schema } from 'mongoose';

interface TaskDocument extends Document {
    title: string;
    description: string;
    dueDate: Date;
    status: 'not started' | 'in progress' | 'completed';
    assigneeId: string;
    projectId: string;
    id: string;
}

const TaskSchema = new Schema<TaskDocument>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, required: true },
    assigneeId: { type: String, required: true },
    projectId: { type: String, required: true },
    id: { type: String, required: true }
});

const TaskModel = mongoose.model<TaskDocument>('Task', TaskSchema);

export class MongooseTaskRepository {
    async save(task: Task): Promise<void> {
        const taskDocument = new TaskModel({
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            status: task.status,
            assigneeId: task.assigneeId,
            projectId: task.projectId
        });
        await taskDocument.save();
    }

    async findAll(): Promise<Task[]> {
        const taskDocs = await TaskModel.find().exec();
        return taskDocs.map(taskDoc => new Task(
            taskDoc.title,
            taskDoc.description,
            taskDoc.dueDate,
            taskDoc.status,
            taskDoc.assigneeId,
            taskDoc.projectId,
            taskDoc.id
        ));
    }

    async findById(id: string): Promise<Task | null> {
        const taskDoc = await TaskModel.findById(id).exec();
        if (!taskDoc) {
            return null;
        }
        return new Task(
            taskDoc.title,
            taskDoc.description,
            taskDoc.dueDate,
            taskDoc.status,
            taskDoc.assigneeId,
            taskDoc.projectId,
            taskDoc.id
        );
    }

    async deleteById(id: string): Promise<void> {
        await TaskModel.findByIdAndDelete(id).exec();
    }

    async findByAssignee(assigneeId: string): Promise<Task[]> {
        const taskDocs = await TaskModel.find({ assigneeId }).exec();
        return taskDocs.map(taskDoc => new Task(
            taskDoc.title,
            taskDoc.description,
            taskDoc.dueDate,
            taskDoc.status,
            taskDoc.assigneeId,
            taskDoc.projectId,
            taskDoc.id
        ));
    }

    async findByProject(projectId: string): Promise<Task[]> {
        const taskDocs = await TaskModel.find({ projectId }).exec();
        return taskDocs.map(taskDoc => new Task(
            taskDoc.title,
            taskDoc.description,
            taskDoc.dueDate,
            taskDoc.status,
            taskDoc.assigneeId,
            taskDoc.projectId,
            taskDoc.id
        ));
    }

    async update(id: string, title: string, description: string, dueDate: Date, status: string, assigneeId: string, projectId: string): Promise<Task | null> {
        const taskDoc = await TaskModel.findById(id).exec();
        if (!taskDoc) {
            return null;
        }
        taskDoc.title = title;
        taskDoc.description = description;
        taskDoc.dueDate = dueDate;
        taskDoc.status = status as 'not started' | 'in progress' | 'completed';
        taskDoc.assigneeId = assigneeId;
        taskDoc.projectId = projectId;
        await taskDoc.save();
        return new Task(
            taskDoc.title,
            taskDoc.description,
            taskDoc.dueDate,
            taskDoc.status,
            taskDoc.assigneeId,
            taskDoc.projectId,
            taskDoc.id
        );
    }
}
