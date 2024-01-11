import { Semester } from '../../semesters/entities/semester.entity';
import { ProjectStatus } from '../project-status.enum';
import { Requirement } from './requirement.entity';
import { User } from '../../users/entities/user.entity';
import { Major } from '../../programs/entities/major.entity';
import { Branch } from '../../programs/entities/branch.entity';
import { Student } from '../../students/entities/student.entity';
export declare class Project {
    code: number;
    name: string;
    stage: number;
    description: string;
    tasks: string;
    references: string;
    status: ProjectStatus;
    semester: Semester;
    requirements: Requirement[];
    supervisors: User[];
    students: Student[];
    majors: Major[];
    branches: Branch[];
    limit: number;
    constructor(project: Partial<Project>);
}
