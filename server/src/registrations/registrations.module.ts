import { Module } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { RegistrationsController } from './registrations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from './entities/registration.entity';
import { RegistrationsRepository } from './registrations.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Registration])],
  controllers: [RegistrationsController],
  providers: [RegistrationsService, RegistrationsRepository],
})
export class RegistrationsModule {}
