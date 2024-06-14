import { Project } from "../../domain/entities/Project";
import mongoose, { Document, Schema } from 'mongoose';

interface ProjectDocument extends Document {
    title: string;
    description: string;
    dueDate: Date;
    status: 'not started' | 'in progress' | 'completed';
    members: string[];
}

const ProjectSchema = new Schema<ProjectDocument>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, required: true },
    members: { type: [String], required: true },
});

const ProjectModel = mongoose.model<ProjectDocument>('Project', ProjectSchema);

export class MongooseProjectRepository {
    async save(project: Project): Promise<void> {
        const projectDocument = new ProjectModel(project);
        await projectDocument.save();
    }

    async findById(id: string): Promise<Project | null> {
        const projectDoc = await ProjectModel.findById(id).exec();
        if (!projectDoc) {
            return null;
        }
        return new Project(projectDoc.title, projectDoc.description, projectDoc.dueDate, projectDoc.status, projectDoc.members, projectDoc.id);
    }

    

    async findAll(): Promise<Project[]> {
        const projectDocs = await ProjectModel.find().exec();
        return projectDocs.map(projectDoc => new Project(projectDoc.title, projectDoc.description, projectDoc.dueDate, projectDoc.status, projectDoc.members,projectDoc.id));
    }
    async deleteById(id: string): Promise<void> {
        await ProjectModel.findByIdAndDelete(id);
    }
}