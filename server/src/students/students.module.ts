import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsRepository } from '../projects/projects.repository';
import { RequirementRepository } from '../projects/requirements.repository';
import { UsersRepository } from '../users/users.repository';
import { Student } from './entities/student.entity';
import { BranchesRepository } from 'src/programs/branches.repository';
import { StudentsRepository } from './students.repository';
import { ProgramsRepository } from 'src/programs/programs.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [ProjectsRepository, UsersRepository, RequirementRepository, BranchesRepository, ProgramsRepository, StudentsRepository]
})
export class StudentsModule {}
