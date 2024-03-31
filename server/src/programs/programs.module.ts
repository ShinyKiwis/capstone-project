import { Module } from '@nestjs/common';
import { ProgramsController } from './programs.controller';
import { ProgramsService } from './programs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { BranchesRepository } from './branches.repository';
import { ProgramsRepository } from './programs.repository';
import { Program } from './entities/program.entity';
import { Version } from './entities/version.entity';
import { VersionsRepository } from './versions.repository';
import { StudentOutcome } from './entities/student-outcome.entity';
import { StudentOutcomesRepository } from './student-outcomes.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, Program, Version, StudentOutcome])],
  controllers: [ProgramsController],
  providers: [ProgramsService, BranchesRepository, ProgramsRepository, VersionsRepository, StudentOutcomesRepository]
})
export class ProgramsModule {}
