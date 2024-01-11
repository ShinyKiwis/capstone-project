import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsRepository } from '../projects/projects.repository';
import { RequirementRepository } from '../projects/requirements.repository';
import { UsersRepository } from '../users/users.repository';
import { Student } from './entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [ProjectsRepository, UsersRepository, RequirementRepository]
})
export class StudentsModule {}
