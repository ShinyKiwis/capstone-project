import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from '../users/users.repository';
import { BranchesRepository } from '../programs/branches.repository';
import { StudentsRepository } from '../students/students.repository';
import { ProjectsRepository } from '../projects/projects.repository';
import { RequirementRepository } from '../projects/requirements.repository';
import { SessionSerializer } from './session.serializer';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { ProgramsRepository } from 'src/programs/programs.repository';

@Module({
  controllers: [AuthController],
  imports: [PassportModule.register({ session: true })],
  providers: [
    AuthService,
    LocalStrategy,
    SessionSerializer,
    UsersRepository,
    BranchesRepository,
    ProgramsRepository,
    StudentsRepository,
    ProjectsRepository,
    RequirementRepository,
  ],
})
export class AuthModule {}
