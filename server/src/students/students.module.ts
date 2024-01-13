import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsRepository } from '../projects/projects.repository';
import { RequirementRepository } from '../projects/requirements.repository';
import { UsersRepository } from '../users/users.repository';
import { Student } from './entities/student.entity';
import { BranchesRepository } from 'src/programs/branches.repository';
import { MajorsRepository } from 'src/programs/majors.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [ProjectsRepository, UsersRepository, RequirementRepository, BranchesRepository, MajorsRepository]
})
export class StudentsModule {}
