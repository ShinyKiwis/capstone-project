import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from 'src/users/users.repository';
import { BranchesRepository } from 'src/programs/branches.repository';
import { MajorsRepository } from 'src/programs/majors.repository';
import { StudentsRepository } from 'src/students/students.repository';
import { ProjectsRepository } from 'src/projects/projects.repository';
import { RequirementRepository } from 'src/projects/requirements.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, BranchesRepository, MajorsRepository, StudentsRepository, ProjectsRepository, RequirementRepository],
})
export class AuthModule {}
