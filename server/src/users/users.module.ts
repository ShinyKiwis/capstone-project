import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { ProjectsRepository } from 'src/projects/projects.repository';
import { RequirementRepository } from 'src/projects/requirements.repository';
import { StudentsRepository } from 'src/students/students.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    ProjectsRepository,
    StudentsRepository,
    RequirementRepository,
  ],
})
export class UsersModule {}
