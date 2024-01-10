import { Semester } from 'src/semesters/entities/semester.entity';
import { ProjectStatus } from '../project-status.enum';
import { Requirement } from './requirement.entity';
import { User } from 'src/users/entities/user.entity';
import { Major } from 'src/programs/entities/major.entity';
import { Branch } from 'src/programs/entities/branch.entity';
import { Student } from 'src/students/entities/student.entity';
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
