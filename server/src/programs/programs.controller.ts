import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { CreateProgramDto } from './dto/create-program.dto';
import { CreateVersionDto } from './dto/create-version.dto';
import { CreateStudentOutcomeDto } from './dto/create-student-outcome.dto';

@Controller('programs')
export class ProgramsController {
  constructor(private programsService: ProgramsService) {}
  @Post()
  createAProgram(@Body() createProgramDto: CreateProgramDto) {
    return this.programsService.createAProgram(createProgramDto);
  }

  @Post(':id/versions')
  createAVersion(
    @Param('id') id: string,
    @Body() createVersionDto: CreateVersionDto,
  ) {
    return this.programsService.createAVersion(+id, createVersionDto);
  }

  @Get(':id/versions')
  GetAllVersionsOfAProgram(
    @Param('id') id: string,
  ) {
    return this.programsService.getAllVersionsOfAProgram(+id);
  }

  @Post(':programId/versions/:versionId')
  createAStudentOutcome(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
    @Body() createStudentOutcomeDto: CreateStudentOutcomeDto,
  ) {
    return this.programsService.createAStudentOutcome(+versionId, +programId, createStudentOutcomeDto);
  }

  @Get(':programId/versions/:versionId')
  GetAllStudentOutcomesOfAVersion(
    @Param('programId') programId: string,
    @Param('versionId') versionId: string,
  ) {
    return this.programsService.getAllStudentOutcomesOfAVersion(+versionId, +programId);
  }

  @Post('branches')
  createABranch(@Body() createBranchDto: CreateBranchDto) {
    return this.programsService.createABranch(createBranchDto);
  }
}
