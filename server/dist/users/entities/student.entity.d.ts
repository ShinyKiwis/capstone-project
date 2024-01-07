import { User } from './user.entity';
import { Project } from 'src/projects/entities/project.entity';
export declare class Student {
    userId: number;
    user: User;
    credits: number;
    generation: number;
    GPA: number;
    project: Project;
    enrolledAt: Date;
}
