import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';
import { Project } from './entities/project.entity';
import { UpdateProjectStatusDto } from './dto/update-project-status.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.createProject(createProjectDto);
  }

  @Get()
  async getProjects(@Query() filterDto: GetProjectsFilterDto) {
    return this.projectsService.getProjects(filterDto);
  }

  @Get(':code')
  async getProjectByCode(@Param('code') code: string) {
    return this.projectsService.getProjectByCode(+code);
  }

  @Patch(':id/status')
  async updateProjectStatus(
    @Param('code') id: string,
    @Body() updateProjectStatusDto: UpdateProjectStatusDto,
  ) {
    const { status } = updateProjectStatusDto;
    return this.projectsService.updateProjectStatus(+id, status);
  }

  @Delete(':code')
  async deleteProject(@Param('code') code: string) {
    return this.projectsService.deleteProject(+code);
  }
}
