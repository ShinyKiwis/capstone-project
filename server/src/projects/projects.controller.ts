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
import { GetProjectsByStatusDto } from './dto/get-projects-by-status.dto';
import { ApproveProjectDto } from './dto/approve-project.dto';
import { RejectProjectDto } from './dto/reject-project.dto';
import { ApproveProjectsDto } from './dto/approve-projects.dto';

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

  @Get('/status')
  async getProjectsByStatus(@Body() getProjectsByStatusDto: GetProjectsByStatusDto) {
    return this.projectsService.getProjectsByStatus(getProjectsByStatusDto);
  }

  @Get(':code')
  async getProjectByCode(@Param('code') code: string) {
    return this.projectsService.getProjectByCode(+code);
  }

  @Patch(':code')
  async updateAProject(@Param('code') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.updateAProject(+id, updateProjectDto);
  }

  @Post('/approve')
  async approveAProject(@Body() approveProjectDto: ApproveProjectDto) {
    return this.projectsService.approveAProject(approveProjectDto);
  }

  @Post('/approve/all')
  async approveProjects(@Body() approveProjectsDto: ApproveProjectsDto) {
    return this.projectsService.approveProjects(approveProjectsDto);
  }

  @Post('/reject')
  async rejectAProject(@Body() rejectProjectDto: RejectProjectDto) {
    return this.projectsService.rejectAProject(rejectProjectDto);
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
