import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { ProjectsRepository } from './projects.repository';
import { ProjectStatus } from './project-status.enum';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsService {
    private readonly projectsRepository;
    constructor(projectsRepository: ProjectsRepository);
    createProject(createProjectDto: CreateProjectDto): Promise<Project>;
    getProjects(filterDto: GetProjectsFilterDto): Promise<{
        total: number;
        current: number;
        projects: Project[];
    }>;
    getProjectByCode(code: number): Promise<Project>;
    updateProjectStatus(code: number, status: ProjectStatus): Promise<Project>;
    deleteProject(code: number): Promise<void>;
    updateAProject(id: number, updateProjectDto: UpdateProjectDto): Promise<import("typeorm").UpdateResult>;
    currentTime(): number;
    extractProjectTitle(inputText: string): {
        vietnameseTitle: string;
        englishTitle: string;
    };
    extractProjectInstructors(text: string): {
        instructors: {};
        emails: {};
    };
    extractMajor(inputText: string): {
        major: string;
    };
    extractBranch(inputText: string): {
        branch: string;
    };
    extractNumberOfParticipants(inputText: string): {
        numberOfParticipants: number;
    };
    extractParticipants(inputText: string): {
        pariticipants: {
            name: string;
            studentID: string;
        }[];
    };
    extractInfo(inputText: any, type: any, startString: any, endString: any): {
        [x: number]: any;
    };
    extractRefs(inputText: any): {
        references: any;
    };
    extractProject(filepath: any): void;
}
