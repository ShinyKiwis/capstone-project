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

@Module({
  imports: [TypeOrmModule.forFeature([Branch, Program, Version])],
  controllers: [ProgramsController],
  providers: [ProgramsService, BranchesRepository, ProgramsRepository, VersionsRepository]
})
export class ProgramsModule {}
