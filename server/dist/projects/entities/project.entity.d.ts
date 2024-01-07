import { Semester } from 'src/semesters/entities/semester.entity';
import { ProjectStatus } from '../project-status.enum';
import { Requirement } from './requirement.entity';
import { User } from 'src/users/entities/user.entity';
import { Student } from 'src/users/entities/student.entity';
export declare class Project {
    code: number;
    name: string;
    stage: number;
    detail: string;
    status: ProjectStatus;
    semester: Semester;
    requirements: Requirement[];
    supervisors: User[];
    students: Student[];
    constructor(project: Partial<Project>);
}
