import { Semester } from 'src/semesters/entities/semester.entity';
import { User } from 'src/users/entities/user.entity';
export declare class CreateProjectDto {
    name: string;
    stage: number;
    detail: string;
    semester: Semester;
    requirements: CreateProjectRequirementDto[];
    supervisors: User[];
}
export declare class CreateProjectRequirementDto {
    attribute: string;
    operator: string;
    value: string;
}
