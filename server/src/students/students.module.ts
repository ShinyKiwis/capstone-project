import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsRepository } from 'src/projects/projects.repository';
import { RequirementRepository } from 'src/projects/requirements.repository';
import { UsersRepository } from 'src/users/users.repository';
import { Student } from './entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [ProjectsRepository, UsersRepository, RequirementRepository]
})
export class StudentsModule {}
