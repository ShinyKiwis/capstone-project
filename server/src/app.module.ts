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
import { RegistrationsModule } from './registrations/registrations.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    ProjectsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      // url: process.env.DB_URL || 'postgres://postgres:postgres@localhost:5434/eduvaDb',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: +process.env.POSTGRES_PORT || 5434,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DB_NAME || 'eduvaDb',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    SemestersModule,
    RolesModule,
    ResourcesModule,
    AuthModule,
    ProgramsModule,
    FacultiesModule,
    StudentsModule,
    RegistrationsModule,
  ],
})
export class AppModule {}
