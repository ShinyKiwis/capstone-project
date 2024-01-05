import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SemestersModule } from './semesters/semesters.module';
import { RolesModule } from './roles/roles.module';
import { ResourcesModule } from './resources/resources.module';

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
  ],
})
export class AppModule {}
