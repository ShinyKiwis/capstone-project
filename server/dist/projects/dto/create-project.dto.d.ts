import { Branch } from 'src/programs/entities/branch.entity';
import { Major } from 'src/programs/entities/major.entity';
import { Semester } from 'src/semesters/entities/semester.entity';
import { User } from 'src/users/entities/user.entity';
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
