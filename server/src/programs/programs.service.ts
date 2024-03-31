import { Injectable } from '@nestjs/common';
import { BranchesRepository } from './branches.repository';
import { CreateBranchDto } from './dto/create-branch.dto';
import { CreateProgramDto } from './dto/create-program.dto';
import { ProgramsRepository } from './programs.repository';
import { CreateVersionDto } from './dto/create-version.dto';
import { VersionsRepository } from './versions.repository';
import { CreateStudentOutcomeDto } from './dto/create-student-outcome.dto';
import { StudentOutcomesRepository } from './student-outcomes.repository';
import { PerformanceIndicatorsRepository } from './performance-indicators.repository';
import { CreatePerformanceIndicatorDto } from './dto/create-performance-indicator.dto';

@Injectable()
export class ProgramsService {
  constructor(
    private branchesRepository: BranchesRepository,
    private programsRepository: ProgramsRepository,
    private versionsRepository: VersionsRepository,
    private studentOutcomesRepository: StudentOutcomesRepository,
    private performanceIndicatorsRepository: PerformanceIndicatorsRepository,
  ) {}

  async createAProgram(createMajorDto: CreateProgramDto) {
    return this.programsRepository.createAProgram(createMajorDto);
  }

  async createABranch(createBranchDto: CreateBranchDto) {
    return this.branchesRepository.createABranch(createBranchDto);
  }

  async getAllVersionsOfAProgram(id: number) {
    return this.versionsRepository.getAllVersionsOfAProgram(id);
  }

  async createAVersion(id: number, createVersionDto: CreateVersionDto) {
    return this.versionsRepository.createAVersion(id, createVersionDto);
  }

  async createAStudentOutcome(
    versionId: number,
    programId: number,
    createStudentOutcomeDto: CreateStudentOutcomeDto,
  ) {
    return this.studentOutcomesRepository.createStudentOutcome(
      versionId,
      programId,
      createStudentOutcomeDto,
    );
  }

  async getAllStudentOutcomesOfAVersion(versionId: number, programId: number) {
    return this.studentOutcomesRepository.getAllStudentOutcomesOfAVersion(
      versionId,
      programId,
    );
  }

  async createAPerformanceIndicator(
    studentOutcomeId: number,
    versionId: number,
    programId: number,
    createPerformanceIndicatorDto: CreatePerformanceIndicatorDto,
  ) {
    return this.performanceIndicatorsRepository.createAPerformanceIndicator(
      studentOutcomeId,
      versionId,
      programId,
      createPerformanceIndicatorDto,
    );
  }

  async getAllPerformanceIndicatorsOfAStudentOutcome(
    studentOutcomeId: number,
    versionId: number,
    programId: number,
  ) {
    return this.performanceIndicatorsRepository.getAllPerformanceIndicatorsOfAStudentOutcome(
      studentOutcomeId,
      versionId,
      programId,
    );
  }
}
