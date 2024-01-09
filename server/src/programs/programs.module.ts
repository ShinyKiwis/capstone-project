import { Module } from '@nestjs/common';
import { ProgramsController } from './programs.controller';
import { ProgramsService } from './programs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { Major } from './entities/major.entity';
import { BranchesRepository } from './branches.repository';
import { MajorsRepository } from './majors.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, Major])],
  controllers: [ProgramsController],
  providers: [ProgramsService, BranchesRepository, MajorsRepository]
})
export class ProgramsModule {}
