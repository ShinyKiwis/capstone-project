import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from '../users/users.repository';
import { BranchesRepository } from '../programs/branches.repository';
import { MajorsRepository } from '../programs/majors.repository';
import { StudentsRepository } from '../students/students.repository';
import { ProjectsRepository } from '../projects/projects.repository';
import { RequirementRepository } from '../projects/requirements.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, BranchesRepository, MajorsRepository, StudentsRepository, ProjectsRepository, RequirementRepository],
})
export class AuthModule {}
