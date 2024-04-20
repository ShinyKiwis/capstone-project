import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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
    updatePerformanceIndicatorDto: UpdatePerformanceIndicatorDto
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
}
