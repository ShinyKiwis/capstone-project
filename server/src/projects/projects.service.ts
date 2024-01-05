import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { ProjectsRepository } from './projects.repository';
import { ProjectStatus } from './project-status.enum';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async createProject(createProjectDto: CreateProjectDto) {
    return this.projectsRepository.createProject(createProjectDto);
  }

  async getProjects(filterDto: GetProjectsFilterDto) {
    return this.projectsRepository.getProjects(filterDto);
  }

  async getProjectByCode(code: number) {
    return this.projectsRepository.getProjectByCode(code);
  }

  async updateProjectStatus(
    code: number,
    status: ProjectStatus,
  ): Promise<Project> {
    const project = await this.getProjectByCode(code);
    project.status = status;
    await this.projectsRepository.save(project);
    return project;
  }

  // async update(code: number, updateProjectDto: UpdateProjectDto) {
  //   const project = await this.projectsRepository.findOneBy({ code });
  //   project.stage = updateProjectDto.stage;
  //   project.status = updateProjectDto.status;
  //   project.detail = updateProjectDto.detail;
  //   await this.projectsRepository.save(project);
  // }

  async deleteProject(code: number) {
    const result = await this.projectsRepository.delete(code);
    if (result.affected === 0) {
      throw new NotFoundException(`Project with Code "${code}" not found`);
    }
  }
}
