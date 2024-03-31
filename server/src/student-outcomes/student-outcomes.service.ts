import { Injectable } from '@nestjs/common';
import { CreateStudentOutcomeDto } from './dto/create-student-outcome.dto';
import { UpdateStudentOutcomeDto } from './dto/update-student-outcome.dto';

@Injectable()
export class StudentOutcomesService {
  create(createStudentOutcomeDto: CreateStudentOutcomeDto) {
    return 'This action adds a new studentOutcome';
  }

  findAll() {
    return `This action returns all studentOutcomes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentOutcome`;
  }

  update(id: number, updateStudentOutcomeDto: UpdateStudentOutcomeDto) {
    return `This action updates a #${id} studentOutcome`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentOutcome`;
  }
}
