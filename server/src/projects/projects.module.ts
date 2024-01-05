import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsRepository } from './projects.repository';
import { Requirement } from './entities/requirement.entity';
import { RequirementRepository } from './requirements.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Requirement])],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectsRepository, RequirementRepository],
})
export class ProjectsModule {}
