import { Module } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { RegistrationsController } from './registrations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from './entities/registration.entity';
import { RegistrationsRepository } from './registrations.repository';
import { SemestersRepository } from 'src/semesters/semesters.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Registration])],
  controllers: [RegistrationsController],
  providers: [RegistrationsService, RegistrationsRepository, SemestersRepository],
})
export class RegistrationsModule {}
