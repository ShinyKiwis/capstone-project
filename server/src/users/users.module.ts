import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Student } from './entities/student.entity';
import { StudentsRepository, UsersRepository } from './users.repository';
import { ProjectsRepository } from 'src/projects/projects.repository';
import { RequirementRepository } from 'src/projects/requirements.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Student])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    StudentsRepository,
    ProjectsRepository,
    RequirementRepository,
  ],
})
export class UsersModule {}
