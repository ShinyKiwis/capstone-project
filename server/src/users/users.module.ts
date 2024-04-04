import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { ProjectsRepository } from '../projects/projects.repository';
import { RequirementRepository } from '../projects/requirements.repository';
import { StudentsRepository } from '../students/students.repository';
import { BranchesRepository } from 'src/programs/branches.repository';
import { ProgramsRepository } from 'src/programs/programs.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    ProjectsRepository,
    StudentsRepository,
    RequirementRepository,
    BranchesRepository,
    ProgramsRepository,
  ],
})
export class UsersModule {}
