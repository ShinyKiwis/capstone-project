import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentOutcomesService } from './student-outcomes.service';
import { CreateStudentOutcomeDto } from './dto/create-student-outcome.dto';
import { UpdateStudentOutcomeDto } from './dto/update-student-outcome.dto';

@Controller('student-outcomes')
export class StudentOutcomesController {
  constructor(private readonly studentOutcomesService: StudentOutcomesService) {}

  @Post()
  create(@Body() createStudentOutcomeDto: CreateStudentOutcomeDto) {
    return this.studentOutcomesService.create(createStudentOutcomeDto);
  }

  @Get()
  findAll() {
    return this.studentOutcomesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentOutcomesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentOutcomeDto: UpdateStudentOutcomeDto) {
    return this.studentOutcomesService.update(+id, updateStudentOutcomeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentOutcomesService.remove(+id);
  }
}
