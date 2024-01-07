import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { ProjectsRepository } from './projects.repository';
import { ProjectStatus } from './project-status.enum';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';
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
}
