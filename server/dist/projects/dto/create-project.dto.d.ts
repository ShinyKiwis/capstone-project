import { Branch } from '../../programs/entities/branch.entity';
import { Major } from '../../programs/entities/major.entity';
import { Semester } from '../../semesters/entities/semester.entity';
import { User } from '../../users/entities/user.entity';
export declare class CreateProjectDto {
    name: string;
    stage: number;
    description: string;
    tasks: string;
    references: string;
    semester: Semester;
    requirements: CreateProjectRequirementDto[];
    supervisors: User[];
    majors: Major[];
    branches: Branch[];
    limit: number;
}
export declare class CreateProjectRequirementDto {
    attribute: string;
    operator: string;
    value: string;
}
