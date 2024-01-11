import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';
import { Project } from './entities/project.entity';
import { UpdateProjectStatusDto } from './dto/update-project-status.dto';
import ProjectFilesInterceptor from './projectFiles.interceptor';
import { UpdateProjectDto } from './dto/update-project.dto';

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

  @Patch(':code')
  async updateAProject(@Param('code') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.updateAProject(+id, updateProjectDto);
  }

  @Patch(':code/status')
  async updateProjectStatus(
    @Param('code') id: string,
    @Body() updateProjectStatusDto: UpdateProjectStatusDto,
  ) {
    const { status } = updateProjectStatusDto;
    return this.projectsService.updateProjectStatus(+id, status);
  }

  @Post('file')
  @UseInterceptors(ProjectFilesInterceptor({
    fieldName: 'file',
    path: '/projects'
  }))
  async uploadFileAndCreateProject(@UploadedFile() file: Express.Multer.File) {
    const response = {
    	originalname: file.originalname,
    	filename: file.filename,
      path: file.path
    };
    this.projectsService.extractProject(file.path);
    return response;
  }

  @Delete(':code')
  async deleteProject(@Param('code') code: string) {
    return this.projectsService.deleteProject(+code);
  }
}
