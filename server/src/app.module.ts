import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SemestersModule } from './semesters/semesters.module';
import { RolesModule } from './roles/roles.module';
import { ResourcesModule } from './resources/resources.module';
import { AuthModule } from './auth/auth.module';
import { ProgramsModule } from './programs/programs.module';
import { FacultiesModule } from './faculties/faculties.module';
import { StudentsModule } from './students/students.module';
import { StudentOutcomesModule } from './student-outcomes/student-outcomes.module';
import { RegistrationsModule } from './registrations/registrations.module';

@Module({
  imports: [
    UsersModule,
    ProjectsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL || 'postgres://postgres:postgres@localhost:5434/eduvaDb',
      port: +process.env.DB_PORT || 5434,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: 'eduvaDb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    SemestersModule,
    RolesModule,
    ResourcesModule,
    AuthModule,
    ProgramsModule,
    FacultiesModule,
    StudentsModule,
    StudentOutcomesModule,
    RegistrationsModule,
  ],
})
export class AppModule {}
