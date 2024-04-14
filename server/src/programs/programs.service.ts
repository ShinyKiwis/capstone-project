import { Injectable, NotFoundException } from '@nestjs/common';
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
import { UpdateProgramDto } from './dto/update-program.dto';
import { UpdatePerformanceIndicatorDto } from './dto/update-performance-indicator.dto';
import { UpdateVersionDto } from './dto/update-version.dto';

@Injectable()
export class ProgramsService {
  constructor(
    private branchesRepository: BranchesRepository,
    private programsRepository: ProgramsRepository,
    private versionsRepository: VersionsRepository,
    private studentOutcomesRepository: StudentOutcomesRepository,
    private performanceIndicatorsRepository: PerformanceIndicatorsRepository,
  ) { }

  async createAProgram(createMajorDto: CreateProgramDto) {
    return this.programsRepository.createAProgram(createMajorDto);
  }

  async createABranch(createBranchDto: CreateBranchDto) {
    return this.branchesRepository.createABranch(createBranchDto);
  }

  async getAProgram(id: number) {
    return this.programsRepository.getAProgram(id);
  }

  async getPrograms() {
    return this.programsRepository.getAllPrograms();
  }

  async createAVersionForAProgram(
    programId: number,
    createVersionDto: CreateVersionDto,
  ) {
    return this.versionsRepository.createAVersionForAProgram(
      programId,
      createVersionDto,
    );
  }

  async getAVersionOfAProgram(programId: number, versionId: number) {
    return this.versionsRepository.getAVersionOfAProgram(programId, versionId);
  }

  async updateAVersion(programId: number, versionId: number, updateVersionDto: UpdateVersionDto) {
    return this.versionsRepository.updateAVersion(programId, versionId, updateVersionDto);
  }

  async createAStudentOutcome(
    programId: number,
    versionId: number,
    createStudentOutcomeDto: CreateStudentOutcomeDto,
  ) {
    return this.studentOutcomesRepository.createStudentOutcome(
      programId,
      versionId,
      createStudentOutcomeDto,
    );
  }

  async getAStudentOutcomeOfAVersion(
    programId: number,
    versionId: number,
    studentOutcomeId: number,
  ) {
    return this.studentOutcomesRepository.getAStudentOutcomeOfAVersion(
      programId,
      versionId,
      studentOutcomeId,
    );
  }

  async createAPerformanceIndicator(
    programId: number,
    versionId: number,
    studentOutcomeId: number,
    createPerformanceIndicatorDto: CreatePerformanceIndicatorDto,
  ) {
    return this.performanceIndicatorsRepository.createAPerformanceIndicator(
      programId,
      versionId,
      studentOutcomeId,
      createPerformanceIndicatorDto,
    );
  }

  async getAPerformanceIndicatorOfAStudentOutcome(
    programId: number,
    versionId: number,
    studentOutcomeId: number,
    performanceIndicatorId: number,
  ) {
    return this.performanceIndicatorsRepository.getAPerformanceIndicatorOfAStudentOutcome(
      programId,
      versionId,
      studentOutcomeId,
      performanceIndicatorId,
    );
  }

  async updateAPerformanceIndicator(
    programId: number,
    versionId: number,
    studentOutcomeId: number,
    performanceIndicatorId: number,
    updatePerformanceIndicatorDto: UpdatePerformanceIndicatorDto
  ) {
    return this.performanceIndicatorsRepository.updateAPerformanceIndicator(
      programId,
      versionId,
      studentOutcomeId,
      performanceIndicatorId,
      updatePerformanceIndicatorDto
    );
  }

  async updateAProgram(id: number, updateProgramDto: UpdateProgramDto) {
    return this.programsRepository.updateAProgram(id, updateProgramDto);
  }

  async deleteProgram(id: number) {
    const result = await this.programsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Project with Code "${id}" not found`);
    }
  }
}
