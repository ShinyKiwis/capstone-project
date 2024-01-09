/// <reference types="multer" />
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';
import { Project } from './entities/project.entity';
import { UpdateProjectStatusDto } from './dto/update-project-status.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    createProject(createProjectDto: CreateProjectDto): Promise<Project>;
    getProjects(filterDto: GetProjectsFilterDto): Promise<{
        total: number;
        current: number;
        projects: Project[];
    }>;
    getProjectByCode(code: string): Promise<Project>;
    updateProjectStatus(id: string, updateProjectStatusDto: UpdateProjectStatusDto): Promise<Project>;
    uploadFileAndCreateProject(file: Express.Multer.File): Promise<{
        originalname: string;
        filename: string;
        path: string;
    }>;
    deleteProject(code: string): Promise<void>;
}
