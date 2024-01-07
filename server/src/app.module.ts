import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SemestersModule } from './semesters/semesters.module';
import { RolesModule } from './roles/roles.module';
import { ResourcesModule } from './resources/resources.module';
import { AuthModule } from './auth/auth.module';
import { ProgramsModule } from './programs/programs.module';

@Module({
  imports: [
    UsersModule,
    ProjectsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: 'postgres',
      database: 'eduvaDb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    SemestersModule,
    RolesModule,
    ResourcesModule,
    AuthModule,
    ProgramsModule,
  ],
})
export class AppModule {}
