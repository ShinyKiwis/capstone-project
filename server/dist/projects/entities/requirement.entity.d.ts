import { Project } from './project.entity';
export declare class Requirement {
    projectCode: number;
    project: Project;
    id: number;
    attribute: string;
    operator: string;
    value: string;
}
