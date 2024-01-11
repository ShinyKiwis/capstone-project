import { DataSource, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';
import { RequirementRepository } from './requirements.repository';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsRepository extends Repository<Project> {
    private dataSource;
    private requirementRepository;
    constructor(dataSource: DataSource, requirementRepository: RequirementRepository);
    createProject(createProjectDto: CreateProjectDto): Promise<Project>;
    updateAProject(id: number, updateProjectDto: UpdateProjectDto): Promise<import("typeorm").UpdateResult>;
    getProjects(filterDto: GetProjectsFilterDto): Promise<{
        total: number;
        current: number;
        projects: Project[];
    }>;
    getProjectByCode(code: number): Promise<Project>;
}
