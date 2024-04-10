import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { CreateProgramDto } from './dto/create-program.dto';
import { CreateVersionDto } from './dto/create-version.dto';
import { CreateStudentOutcomeDto } from './dto/create-student-outcome.dto';
import { CreatePerformanceIndicatorDto } from './dto/create-performance-indicator.dto';

@Controller('programs')
export class ProgramsController {
  constructor(private programsService: ProgramsService) {}
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

  @Post('branches')
  createABranch(@Body() createBranchDto: CreateBranchDto) {
    return this.programsService.createABranch(createBranchDto);
  }

  @Delete(':id')
  DeleteAProgram(@Param('id') id: string) {
    return this.programsService.deleteProgram(+id);
  }
}
