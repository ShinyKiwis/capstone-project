import { Body, Controller, Post } from '@nestjs/common';
import { CreateMajorDto } from './dto/create-major.dto';
import { ProgramsService } from './programs.service';
import { CreateBranchDto } from './dto/create-branch.dto';

@Controller('programs')
export class ProgramsController {
  constructor(private programsService: ProgramsService) {}
  @Post('majors')
  createAMajor(@Body() createMajorDto: CreateMajorDto) {
    return this.programsService.createAMajor(createMajorDto);
  }

  @Post('branches')
  createABranch(@Body() createBranchDto: CreateBranchDto) {
    return this.programsService.createABranch(createBranchDto);
  }
}
