import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { CreateProgramDto } from './dto/create-program.dto';
import { CreateVersionDto } from './dto/create-version.dto';
import { CreateStudentOutcomeDto } from './dto/create-student-outcome.dto';
import { CreatePerformanceIndicatorDto } from './dto/create-performance-indicator.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { UpdatePerformanceIndicatorDto } from './dto/update-performance-indicator.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
import { UpdateStudentOutcomeDto } from './dto/update-student-outcome.dto';
import { CreateProgramEducationObjectiveDto } from './dto/create-program-education-objective.dto';
import { UpdateProgramEducationObjectiveDto } from './dto/update-program-education-objective.dto';
import { CreateAssessmentSchemeDto } from './dto/create-assessment-scheme.dto';
import { CreateAssessmentRecordDto } from './dto/create-assessment-record.dto';
import { CreateAssessmentRecordsDto } from './dto/create-assessment-records.dto';
import { GetAssessmentRecordsFilterDto } from './dto/get-assessment-records-filter.dto';
import ProgramFileInterceptor from './programFile.interceptor';
import { promises } from 'fs';

@Controller('programs')
export class ProgramsController {
  constructor(private programsService: ProgramsService) { }
  @Post()
  createAProgram(@Body() createProgramDto: CreateProgramDto) {
    return this.programsService.createAProgram(createProgramDto);
  }

  @Get(':id/semesters')
  GetAllSemestersOfAProgram(@Param('id') id: string) {
    // return this.programsService.getAllSemestersOfAProgram(+id);
  }

  @Get(':id')
  GetAProgram(@Param('id') id: string) {
    return this.programsService.getAProgram(+id);
  }

  @Get()
  GetPrograms() {
    return this.programsService.getPrograms();
  }

  @Post(':programId/versions')
  createAVersionForAProgram(
    @Param('programId') programId: string,
    @Body() createVersionDto: CreateVersionDto,
  ) {
    return this.programsService.createAVersionForAProgram(
      +programId,
      createVersionDto,
    );
  }

  @Get(':programId/versions/:versionId')
  GetAVersionOfAProgram(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
  ) {
    return this.programsService.getAVersionOfAProgram(+programId, +versionId);
  }

  @Patch(':programId/versions/:versionId')
  UpdateAVersion(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
    @Body() updateVersionDto: UpdateVersionDto
  ) {
    return this.programsService.updateAVersion(+programId, +versionId, updateVersionDto);
  }

  @Delete(':programId/versions/:versionId')
  DeleteAVersion(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
  ) {
    return this.programsService.deleteAVersion(+programId, +versionId);
  }

  @Post(':programId/versions/:versionId/program-education-objectives')
  createAProgramEducationObjective(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
    @Body() createProgramEducationObjectiveDto: CreateProgramEducationObjectiveDto,
  ) {
    return this.programsService.createAProgramEducationObjective(
      +programId,
      +versionId,
      createProgramEducationObjectiveDto,
    );
  }

  @Get(':programId/versions/:versionId/program-education-objectives/:programEducationObjectiveId')
  GetAProgramEducationObjective(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
    @Param('programEducationObjectiveId') programEducationObjectiveId: string,
  ) {
    return this.programsService.getAProgramEducationObjectiveOfAVersion(
      +programId,
      +versionId,
      +programEducationObjectiveId,
    );
  }

  @Get(':programId/versions/:versionId/program-education-objectives')
  GetAllProgramEducationObjectiveOfAVersion(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
  ) {
    return this.programsService.getAllProgramEducationObjectiveOfAVersion(
      +programId,
      +versionId
    );
  }

  @Patch(':programId/versions/:versionId/program-education-objectives/:programEducationObjectiveId')
  UpdateAProgramEducationObjective(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
    @Param('programEducationObjectiveId') programEducationObjectiveId: string,
    @Body() updateProgramEducationObjectiveDto: UpdateProgramEducationObjectiveDto
  ) {
    return this.programsService.updateAProgramEducationObjective(+programId, +versionId, +programEducationObjectiveId, updateProgramEducationObjectiveDto)
  }

  @Delete(':programId/versions/:versionId/program-education-objectives/:programEducationObjectiveId')
  DeleteAProgramEducationObjective(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
    @Param('programEducationObjectiveId') programEducationObjectiveId: string,
  ) {
    return this.programsService.deleteAProgramEducationObjective(+programId, +versionId, +programEducationObjectiveId);
  }

  @Post(':programId/versions/:versionId/student-outcomes')
  createAStudentOutcome(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
    @Body() createStudentOutcomeDto: CreateStudentOutcomeDto,
  ) {
    return this.programsService.createAStudentOutcome(
      +programId,
      +versionId,
      createStudentOutcomeDto,
    );
  }

  @Get(':programId/versions/:versionId/student-outcomes/:studentOutcomeId')
  GetAStudentOutcomeOfAVersion(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
    @Param('studentOutcomeId') studentOutcomeId: string,
  ) {
    return this.programsService.getAStudentOutcomeOfAVersion(
      +programId,
      +versionId,
      +studentOutcomeId,
    );
  }

  @Patch(':programId/versions/:versionId/student-outcomes/:studentOutcomeId')
  UpdateAStudentOutcome(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
    @Param('studentOutcomeId') studentOutcomeId: string,
    @Body() updateStudentOutcomeDto: UpdateStudentOutcomeDto
  ) {
    return this.programsService.updateAStudentOutcome(+programId, +versionId, +studentOutcomeId, updateStudentOutcomeDto)
  }

  @Delete(':programId/versions/:versionId/student-outcomes/:studentOutcomeId')
  DeleteAStudentOutcome(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
    @Param('studentOutcomeId') studentOutcomeId: string,
  ) {
    return this.programsService.deleteAStudentOutcome(+programId, +versionId, +studentOutcomeId);
  }

  @Post(
    ':programId/versions/:versionId/student-outcomes/:studentOutcomeId/performance-indicators',
  )
  createAPerformanceIndicator(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
    @Param('studentOutcomeId') studentOutcomeId: string,
    @Body() createPerformanceIndicatorDto: CreatePerformanceIndicatorDto,
  ) {
    return this.programsService.createAPerformanceIndicator(
      +programId,
      +versionId,
      +studentOutcomeId,
      createPerformanceIndicatorDto,
    );
  }

  @Get(
    ':programId/versions/:versionId/student-outcomes/:studentOutcomeId/performance-indicators/:performanceIndicatorId',
  )
  GetAllPerformanceIndicatorsOfAStudentOutcome(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
    @Param('studentOutcomeId') studentOutcomeId: string,
    @Param('performanceIndicatorId') performanceIndicatorId: string,
  ) {
    return this.programsService.getAPerformanceIndicatorOfAStudentOutcome(
      +programId,
      +versionId,
      +studentOutcomeId,
      +performanceIndicatorId,
    );
  }

  @Patch(':programId/versions/:versionId/student-outcomes/:studentOutcomeId/performance-indicators/:performanceIndicatorId')
  UpdateAPerformanceIndicator(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
    @Param('studentOutcomeId') studentOutcomeId: string,
    @Param('performanceIndicatorId') performanceIndicatorId: string,
    @Body() updatePerformanceIndicatorDto: UpdatePerformanceIndicatorDto
  ) {
    return this.programsService.updateAPerformanceIndicator(+programId, +versionId, +studentOutcomeId, +performanceIndicatorId, updatePerformanceIndicatorDto);
  }

  @Delete(':programId/versions/:versionId/student-outcomes/:studentOutcomeId/performance-indicators/:performanceIndicatorId')
  DeleteAPerformanceIndicator(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
    @Param('studentOutcomeId') studentOutcomeId: string,
    @Param('performanceIndicatorId') performanceIndicatorId: string,
  ) {
    return this.programsService.deleteAPerformanceIndicator(+programId, +versionId, +studentOutcomeId, +performanceIndicatorId);
  }

  @Post('branches')
  createABranch(@Body() createBranchDto: CreateBranchDto) {
    return this.programsService.createABranch(createBranchDto);
  }

  @Patch(':id')
  updateAProgram(@Param('id') id: string, @Body() updateProgramDto: UpdateProgramDto) {
    return this.programsService.updateAProgram(+id, updateProgramDto);
  }

  @Delete(':id')
  DeleteAProgram(@Param('id') id: string) {
    return this.programsService.deleteProgram(+id);
  }

  @Get(':programId/versions/:versionId/assessment-schemes')
  getAllAssessmentScheme(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string
  ) {
    return this.programsService.getAllAssessmentSchemes(+programId, +versionId);
  }

  @Post(':programId/versions/:versionId/assessment-schemes')
  createAnAssessmentScheme(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
    @Body() createAssessmentSchemeDto: CreateAssessmentSchemeDto,
  ) {
    return this.programsService.createAnAssessmentScheme(
      +programId,
      +versionId,
      createAssessmentSchemeDto,
    );
  }

  @Delete(':programId/versions/:versionId/assessment-schemes/:assessmentSchemeId')
  deleteAnAssessmentScheme(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
    @Param('assessmentSchemeId') assessmentSchemeId: string,
  ) {
    return this.programsService.deleteAnAssessmentScheme(
      +programId,
      +versionId,
      +assessmentSchemeId,
    );
  }

  @Get(':programId/versions/:versionId/assessment-schemes/:assessmentSchemeId')
  getAnAssessmentScheme(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
    @Param('assessmentSchemeId') assessmentSchemeId: string,
  ) {
    return this.programsService.getAnAssessmentScheme(
      +programId,
      +versionId,
      +assessmentSchemeId,
    );
  }

  @Get(':programId/versions/:versionId/assessment-schemes/:assessmentSchemeId/criteria/:criterionId/assessment-records')
  getAllAssessmentRecords(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
    @Param('assessmentSchemeId') assessmentSchemeId: string,
    @Param('criterionId') criterionId: string,
    @Query() getAssessmentRecordsFilterDto: GetAssessmentRecordsFilterDto
  ) {
    return this.programsService.getAllAssessmentRecords(
      +programId,
      +versionId,
      +assessmentSchemeId,
      +criterionId,
      getAssessmentRecordsFilterDto
    );
  }

  @Post(':programId/versions/:versionId/assessment-schemes/:assessmentSchemeId/assessment-records')
  createAssessmentRecord(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
    @Param('assessmentSchemeId') assessmentSchemeId: string,
    @Body() createAssessmentRecordsDto: CreateAssessmentRecordsDto,
  ) {
    return this.programsService.createAssessmentRecord(
      +programId,
      +versionId,
      +assessmentSchemeId,
      createAssessmentRecordsDto,
    );
  }

  @Get(':programId/versions/:versionId/assessment-schemes/:assessmentSchemeId/assessment-records')
  getAllAssessmentRecordsOfAnAssessmentScheme(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
    @Param('assessmentSchemeId') assessmentSchemeId: string,
    @Query() getAssessmentRecordsFilterDto: GetAssessmentRecordsFilterDto
  ) {
    return this.programsService.getAssessmentRecordsOfAScheme(
      +programId,
      +versionId,
      +assessmentSchemeId,
      getAssessmentRecordsFilterDto
    );
  }

  @Post(':programId/versions/:versionId/assessment-schemes/:assessmentSchemeId/duplicate')
  duplicateAssessmentScheme(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
    @Param('assessmentSchemeId') assessmentSchemeId: string,
  ) {
    return this.programsService.duplicateAssessmentScheme(
      +programId,
      +versionId,
      +assessmentSchemeId,
    );
  }

  @Post(':programId/versions/:versionId/student-outcomes/:studentOutcomeId/performance-indicators/file')
  @UseInterceptors(
    ProgramFileInterceptor({
      fieldName: 'file',
      path: '/programs',
    }),
  )
  uploadPerformanceIndicatorsFile(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
    @Param('studentOutcomeId') studentOutcomeId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // let response = {
    //   originalname: file.originalname,
    //   fileName: file.filename,
    //   path: file.path,
    // }
    console.log(file);
    return this.programsService.extractPerformanceIndicators(+programId, +versionId, +studentOutcomeId, file);
  }

  @Post(':programId/versions/:versionId/student-outcomes/file')
  @UseInterceptors(
    ProgramFileInterceptor({
      fieldName: 'file',
      path: '/programs/studentoutcomes',
    }),
  )
  uploadStudentOutcomesFile(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    return this.programsService.extractStudentOutcomes(+programId, +versionId, file);
  }

  @Delete(':programId/versions/:versionId/assessment-schemes/:assessmentSchemeId/criteria/:criterionId/assessment-records/:assessmentRecordId')
  deleteAnAssessmentRecord(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
    @Param('assessmentSchemeId') assessmentSchemeId: string,
    @Param('criterionId') criterionId: string,
    @Param('assessmentRecordId') assessmentRecordId: string,
  ) {
    return this.programsService.deleteAnAssessmentRecord(
      +programId,
      +versionId,
      +assessmentSchemeId,
      +criterionId,
      +assessmentRecordId,
    );
  }

}

