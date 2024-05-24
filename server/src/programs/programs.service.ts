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
import { UpdateStudentOutcomeDto } from './dto/update-student-outcome.dto';
import { CreateProgramEducationObjectiveDto } from './dto/create-program-education-objective.dto';
import { ProgramEducationObjectivesRepository } from './program-education-objectives.repository';
import { UpdateProgramEducationObjectiveDto } from './dto/update-program-education-objective.dto';
import { CreateAssessmentSchemeDto } from './dto/create-assessment-scheme.dto';
import { AssessmentSchemesRepository } from './assessment-schemes.repository';
import { CreateAssessmentRecordDto } from './dto/create-assessment-record.dto';
import { AssessmentRecordsRepository } from './assessment-records.repository';
import { CreateAssessmentRecordsDto } from './dto/create-assessment-records.dto';
import { GetAssessmentRecordsFilterDto } from './dto/get-assessment-records-filter.dto';
import * as XLSX from 'xlsx';
import { fstat } from 'fs';
import * as fs from 'fs';

@Injectable()
export class ProgramsService {
  constructor(
    private branchesRepository: BranchesRepository,
    private programsRepository: ProgramsRepository,
    private versionsRepository: VersionsRepository,
    private studentOutcomesRepository: StudentOutcomesRepository,
    private performanceIndicatorsRepository: PerformanceIndicatorsRepository,
    private programEducationObjectivesRepository: ProgramEducationObjectivesRepository,
    private assessmentSchemesRepository: AssessmentSchemesRepository,
    private assessmentRecordsRepository: AssessmentRecordsRepository,
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

  async deleteAVersion(programId: number, versionId: number) {
    const result = await this.versionsRepository.delete({
      programId,
      id: versionId
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Version with id ${versionId} of program with id ${programId} does not exist`,
      );
    }
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

  async updateAStudentOutcome(
    programId: number,
    versionId: number,
    studentOutcomeId: number,
    updateStudentOutcomeDto: UpdateStudentOutcomeDto
  ) {
    return this.studentOutcomesRepository.updateAStudentOutcome(programId, versionId, studentOutcomeId, updateStudentOutcomeDto);
  }

  async deleteAStudentOutcome(programId: number, versionId: number, studentOutcomeId: number,) {
    const result = await this.studentOutcomesRepository.delete({
      versionProgramId: programId,
      versionId,
      id: studentOutcomeId
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Student Outcome with id ${studentOutcomeId} of version with id ${versionId} of program with id ${programId} not found`,
      );
    }
  }

  async createAProgramEducationObjective(
    programId: number,
    versionId: number,
    createProgramEducationObjectiveDto: CreateProgramEducationObjectiveDto,
  ) {
    return this.programEducationObjectivesRepository.createProgramEducationObjective(
      programId,
      versionId,
      createProgramEducationObjectiveDto,
    );
  }

  async getAllProgramEducationObjectiveOfAVersion(
    programId: number,
    versionId: number,
  ) {
    return this.programEducationObjectivesRepository.getAllProgramEducationObjectiveOfAVersion(
      programId,
      versionId,
    );
  }

  async getAProgramEducationObjectiveOfAVersion(
    programId: number,
    versionId: number,
    programEducationObjectiveId: number,
  ) {
    return this.programEducationObjectivesRepository.getAProgramEducationObjective(
      programId,
      versionId,
      programEducationObjectiveId,
    );
  }

  async updateAProgramEducationObjective(
    programId: number,
    versionId: number,
    programEducationObjectiveId: number,
    updateProgramEducationObjectiveDto: UpdateProgramEducationObjectiveDto
  ) {
    return this.programEducationObjectivesRepository.updateAProgramEducationObjective(programId, versionId, programEducationObjectiveId, updateProgramEducationObjectiveDto);
  }

  async deleteAProgramEducationObjective(programId: number, versionId: number, programEducationObjectiveId: number,) {
    const result = await this.programEducationObjectivesRepository.delete({
      versionProgramId: programId,
      versionId,
      id: programEducationObjectiveId
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Program Education Objective with id ${programEducationObjectiveId} of version with id ${versionId} of program with id ${programId} not found`,
      );
    }
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

  async deleteAPerformanceIndicator(programId: number, versionId: number, studentOutcomeId: number, performanceIndicatorId: number) {
    const result = await this.performanceIndicatorsRepository.delete({
      studentOutcomeVersionProgramId: programId,
      studentOutcomeVersionId: versionId,
      studentOutcomeId,
      id: performanceIndicatorId
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Performance Indicator with id ${performanceIndicatorId} of Student Outcome with id ${studentOutcomeId} of version with id ${versionId} of program with id ${programId} not found`,
      );
    }
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

  async createAnAssessmentScheme(
    programId: number,
    versionId: number,
    createAssessmentSchemeDto: CreateAssessmentSchemeDto
  ) {
    return this.assessmentSchemesRepository.createAssessmentScheme(programId, versionId, createAssessmentSchemeDto);
  }

  async getAllAssessmentSchemes(programId: number, versionId: number) {
    return this.assessmentSchemesRepository.getAllAssessmentSchemes(programId, versionId);
  }

  async deleteAnAssessmentScheme(programId: number, versionId: number, assessmentSchemeId: number) {
    const result = await this.assessmentSchemesRepository.delete({
      versionProgramId: programId,
      versionId,
      id: assessmentSchemeId
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Assessment Scheme with id ${assessmentSchemeId} of version with id ${versionId} of program with id ${programId} not found`,
      );
    }
  }

  async getAnAssessmentScheme(programId: number, versionId: number, assessmentSchemeId: number) {
    return this.assessmentSchemesRepository.getAnAssessmentScheme(programId, versionId, assessmentSchemeId);
  }

  async createAssessmentRecord(programId: number, versionId: number, assessmentSchemeId: number, createAssessmentRecordsDto: CreateAssessmentRecordsDto) {
    return this.assessmentRecordsRepository.createAssessmentRecords(programId, versionId, assessmentSchemeId, createAssessmentRecordsDto);
  }

  async getAllAssessmentRecords(programId: number, versionId: number, assessmentSchemeId: number, criterionId: number, getAssessmentRecordsFilterDto: GetAssessmentRecordsFilterDto) {
    return this.assessmentRecordsRepository.getAllAssessmentRecords(programId, versionId, assessmentSchemeId, criterionId, getAssessmentRecordsFilterDto);
  }

  async getAssessmentRecordsOfAScheme(programId: number, versionId: number, assessmentSchemeId: number, getAssessmentRecordsFilterDto: GetAssessmentRecordsFilterDto) {
    return this.assessmentRecordsRepository.getAssessmentRecordsOfAScheme(programId, versionId, assessmentSchemeId, getAssessmentRecordsFilterDto);
  }

  async duplicateAssessmentScheme(
    programId: number,
    versionId: number,
    assessmentSchemeId: number,
  ) {
    return this.assessmentSchemesRepository.duplicateAssessmentScheme(programId, versionId, assessmentSchemeId);
  }

  async extractPerformanceIndicators(programId: number, versionId: number, studentOutcomeId: number, file: Express.Multer.File) {
    const workbook = XLSX.readFile(file.path);
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    for(let i = 1; i < data.length; i++) {
      const performanceIndicator: CreatePerformanceIndicatorDto = {
        name: data[i][0],
        description: data[i][1],
      }
      await this.performanceIndicatorsRepository.createAPerformanceIndicator(programId, versionId, studentOutcomeId, performanceIndicator);
    }
    fs.unlinkSync(file.path)
    return data;
  }
}
